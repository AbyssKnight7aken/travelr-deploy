import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Log } from 'src/app/types/log';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {
  constructor(private apiService: ApiService, private router: Router, private activatedRoute: ActivatedRoute, private datePipe: DatePipe) { }

  log!: any //TODO: implement data validation !!!
  errorMesssageFromServer!: string;
  image: any
  url: string = '';
  selectedFile: any
  fileName: string = '';
  id: string = this.activatedRoute.snapshot.params['logId'];
  date: any;
  subscriptions: Subscription = new Subscription();

  ngOnInit(): void {
    const currentLog$ = this.apiService.getDetails(this.id).subscribe(
      {
        next: (result) => {
          this.log = result;
          this.image = this.getImageAsBase64();
          const parsedDate = new Date(this.log.date);
          console.log(parsedDate);
          console.log(this.log.date);
          
          this.date = this.datePipe.transform(parsedDate, 'yyyy-MM-dd');
          console.log(this.log);
        },
        error: (error) => {
          console.log(error.error.message);
          this.errorMesssageFromServer = error.error.message;
        }
      }
    );
    this.subscriptions.add(currentLog$);
  }

  getImageAsBase64(): string {
    let binary = '';
    const bytes = new Uint8Array(this.log.img.data.data);

    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  loadFile(event: any): void {

    if (event.target.files) {
      const reader = new FileReader();
      this.selectedFile = <File>event.target.files[0];
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target?.result;
      }
    }
  }

  convertToImageFile(base64String: string, filename: string): File {
    const byteCharacters = atob(base64String);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: 'image/jpeg' });

    const file = new File([blob], filename, { type: 'image/jpeg' });
    return file;
  }

  editHandler(editForm: NgForm) {
    if (editForm.invalid) {
      return;
    }
    console.log(editForm.value);

    const formData = new FormData();

    if (this.selectedFile) {
      this.fileName = this.selectedFile.name;
      formData.append('img', this.selectedFile);
    } else {
      this.selectedFile = this.convertToImageFile(this.getImageAsBase64(), editForm.value.name);
      formData.append('img', this.selectedFile);
    }

    formData.append('name', editForm.value.name);
    formData.append('date', editForm.value.date);
    formData.append('description', editForm.value.description);
    formData.append('location', editForm.value.location);

    this.apiService.edit(this.id, formData as unknown as Log).subscribe({
      next: (updatedLog) => {
        console.log(updatedLog);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.log(error.error.message);
        this.errorMesssageFromServer = error.error.message;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
      console.log('unsubscribed');
      
    }
  }

}
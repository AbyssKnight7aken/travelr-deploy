import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { Log } from 'src/app/types/log';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnDestroy {
  constructor(private apiService: ApiService, private router: Router) { }

  errorMesssageFromServer!: string;
  url: string = '/assets/images/default_image.png';
  selectedFile: any
  fileName: string = '';
  subscriptions: Subscription = new Subscription();

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

  create(form: NgForm) {
    if (form.invalid) {
      return;
    }

    if (this.selectedFile) {
      console.log(this.selectedFile);
      this.fileName = this.selectedFile.name;
    }

    form.value.img = this.selectedFile;
    console.log(form.value);

    const formData = new FormData();
    formData.append('name', form.value.name);
    formData.append('date', form.value.date);
    formData.append('description', form.value.description);
    formData.append('location', form.value.location);
    formData.append('img', this.selectedFile);
    
    const newLog$ = this.apiService.create(formData as unknown as Log).subscribe({
      next: (newLog) => {
        console.log(newLog);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.log(error.error.message);
        this.errorMesssageFromServer = error.error.message;
      }
    });
    this.subscriptions.add(newLog$);
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
      console.log('unsubscribed');
      
    }
  }
}





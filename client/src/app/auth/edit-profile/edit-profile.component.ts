import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ImageService } from 'src/app/services/image.service';
import { SessionService } from 'src/app/services/session.service';
import { createUserData } from 'src/app/types/createUserData';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private authService: AuthService, private sessionServise: SessionService, private imageService: ImageService) { }
  
  subscriptions: Subscription = new Subscription();
  errorMesssageFromServer!: string;
  validateEmail: boolean = true;

  user: User | undefined;
  userId!: string;
  profilePic: any;

  url: string = '/assets/images/default_image.png';
  selectedFile: any
  fileName: string = '';


  ngOnInit(): void {
    const currentUser$ = this.authService.getUserInfo().subscribe({
      next: (userInfo) => {
        this.user = userInfo;
        this.userId = this.user._id;
        this.profilePic = this.imageService.getImageAsBase64(this.user.img.data.data);
        console.log(this.user);
      },
      error: (error) => {
        console.log(error.error.message);
        this.errorMesssageFromServer = error.error.message;
      }
    });
    this.subscriptions.add(currentUser$);
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


  editUserHandler(editUserForm: NgForm): void {

    if (editUserForm.invalid) {
      return;
    }

    const formData = new FormData();

    if (this.selectedFile) {
      this.fileName = this.selectedFile.name;
      formData.append('img', this.selectedFile);
    } else {
      this.selectedFile = this.convertToImageFile(this.imageService.getImageAsBase64(this.user?.img.data.data), editUserForm.value.username);
      formData.append('img', this.selectedFile);
    }

    console.log(editUserForm.value);

    formData.append('username', editUserForm.value.username);
    formData.append('email', editUserForm.value.email);
    formData.append('password', editUserForm.value.password);

    console.log(formData.get('img'));


    // this.router.navigate(['/user/profile']);

    const editedUser$ = this.authService.updateUserData(formData as unknown as createUserData).subscribe({
      next: (updatedUser) => {
        console.log(updatedUser);
        this.sessionServise.createSession(updatedUser);
        this.router.navigate(['/user/profile']);
      },
      error: (error) => {
        console.log(error.error.message);
        this.errorMesssageFromServer = error.error.message;
      }
    });
    this.subscriptions.add(editedUser$);
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
      console.log('unsubscribed');
      
    }
  }
}

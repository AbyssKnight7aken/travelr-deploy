import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AuthGuard } from '../guards/auth-activate.guard';
import { GuestGuard } from '../guards/guest-activate.guard';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [GuestGuard]     
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [GuestGuard] 
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'profile/edit',
        component: EditProfileComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
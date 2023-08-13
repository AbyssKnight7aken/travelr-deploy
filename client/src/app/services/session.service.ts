import { Injectable } from '@angular/core';
import { User } from '../types/user';


@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor() { }
  
  createSession(token: any): void {
    localStorage.setItem('token', JSON.stringify(token));
  }

  getToken(): any | null {
    const token = localStorage.getItem('token');
    if (token) {
      return JSON.parse(token);
    }

    return null;
  }

  clearSession(): void {
    localStorage.removeItem('token');
  }

  getUserData(): any | null {
    const token = localStorage.getItem('token');
    if (token) {
      const UserData = JSON.parse(token);
      const result: any = {
        username: UserData.username,
        email: UserData.email,
        _id: UserData._id,
      }
      return result;
    }

    return null;
  }

  get hasUser(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

}

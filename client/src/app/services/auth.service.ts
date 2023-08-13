import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../types/user';
import { environment } from 'src/environments/environment';
import { createUserData } from '../types/createUserData';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private sessionService: SessionService) { }

  register(userData: createUserData): Observable<User> {
    return this.httpClient.post<User>(`${environment.appUrl}/users/register`, userData);
  }

  login(userData: createUserData): Observable<User> {
    return this.httpClient.post<User>(`${environment.appUrl}/users/login`, userData);
  }

  logout() {
    return this.httpClient.get(`${environment.appUrl}/users/logout`);
  }

  getUserInfo(): Observable<User> {
    return this.httpClient.get<User>(`${environment.appUrl}/users/profile`);
  }
  
  updateUserData(userData: createUserData): Observable<User> {
    return this.httpClient.put<User>(`${environment.appUrl}/users/update`, userData);
  }
}

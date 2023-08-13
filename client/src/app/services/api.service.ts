import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Log } from '../types/log';
import { Post } from '../types/post';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }
  appUrl = environment.appUrl;

  getCount() {
    return this.http.get<number>(`${this.appUrl}/logs/count`);
  }

  getLogs(page: number) {
    return this.http.get<Log[]>(`${this.appUrl}/logs?page=${page}`);
  }

  getRescentLogs() {
    return this.http.get<Log[]>(`${this.appUrl}/logs/rescent`);
  }

  getDetails(id: any) {
    return this.http.get<any>(`${this.appUrl}/logs/${id}`);
  }

  getUserLogs(userId: string, page: number): Observable<any> {
    return this.http.get<any>(`${this.appUrl}/logs?where=_ownerId%3D%22${userId}%22&page=${page}`);
  }

  create(body: Log) {
    return this.http.post<Log>(`${this.appUrl}/logs`, body);
  }

  edit(id: string, body: Log) {
    return this.http.put<any>(`${this.appUrl}/logs/${id}`, body);
  }

  deleteByLogId(id: string) {
    return this.http.delete<any>(`${this.appUrl}/logs/${id}`);
  }

  getSearchCount(searchParam: string) {
    return this.http.get<number>(`${this.appUrl}/logs/search?searchParam=${searchParam}`);
  }

  getSearchResult(searchParam: string, page: number) {
    return this.http.post<Log[]>(`${this.appUrl}/logs/search`, {searchParam, page});
  }

  addComment(id: string, comment: FormData) {
    return this.http.post<any>(`${this.appUrl}/logs/${id}/comments`, comment);
  }

  addLike(id: string) {
    return this.http.get<Log>(`${this.appUrl}/logs/${id}/likes`);
  }

  downloadImage(id: string) {
    return this.http.get<Log>(`${this.appUrl}/logs/${id}/downloads`);
  }
}

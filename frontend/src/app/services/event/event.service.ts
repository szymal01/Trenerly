import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  apiUrl = 'http://127.0.0.1:8000/';

  constructor(private http: HttpClient) {}

  getEventsList(params?: any) {
    return this.http.get(this.apiUrl + 'event', { params: params });
  }
}

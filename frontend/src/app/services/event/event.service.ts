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
    return this.http.get(this.apiUrl + 'events', { params: params });
  }
  addEvent(eventData: any) {
    return this.http.post<any>('http://127.0.0.1:8000/events/', eventData);
  }
  getEventTypesList() {
    return this.http.get('http://127.0.0.1:8000/event_types/');
  }
  addStats(statsData: any) {
    return this.http.post<any>('http://127.0.0.1:8000/stats/', statsData);
  }
  getStats(params?: any) {
    return this.http.get('http://127.0.0.1:8000/stats/', { params: params });
  }
}

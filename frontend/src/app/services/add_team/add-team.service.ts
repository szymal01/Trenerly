import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AddTeamService {
  constructor(private http: HttpClient) {}

  addTeam(teamData: any) {
    return this.http.post<any>('http://127.0.0.1:8000/teams/', teamData);
  }
  getTeamsList() {
    return this.http.get('http://127.0.0.1:8000/teams/');
  }
}

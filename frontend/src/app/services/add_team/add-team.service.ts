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
  getTeam(teamId: any) {
    return this.http.get(`http://127.0.0.1:8000/teams/${teamId}/`);
  }

  getTeamsList() {
    return this.http.get('http://127.0.0.1:8000/teams/');
  }
  getTeamUsersList() {
    return this.http.get('http://127.0.0.1:8000/teams/');
  }
}

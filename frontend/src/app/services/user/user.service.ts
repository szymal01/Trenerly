import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  registerUser(userData: any) {
    return this.http.post<any>('http://127.0.0.1:8000/register/', userData);
  }
  getUser(uuid: string) {
    return this.http.get('http://127.0.0.1:8000/users/' + uuid);
  }

  addPlayerToTeam(userData: any) {
    return this.http.post<any>(
      'http://127.0.0.1:8000/users/add_player_to_team/',
      userData
    );
  }

  updateUser(uuid: string, userData: any) {
    return this.http.patch(
      'http://127.0.0.1:8000/users/' + uuid + '/',
      userData
    );
  }
  getUsersList() {
    return this.http.get('http://127.0.0.1:8000/users/');
  }
}

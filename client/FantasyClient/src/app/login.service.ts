import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:8080/users/signin';

  constructor(private http: HttpClient) {
  }

  loggedIn(username: string, password: string): Observable<string> {
    return this.http.post(`${this.baseUrl}`, {username, password}, {responseType: 'text'});
  }

}

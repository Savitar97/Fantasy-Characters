import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private baseUrl = 'http://localhost:8080/users/signup';

  constructor(private http: HttpClient) {
  }

  SignUp(username: string, password: string, email: string, roles: string[]): Observable<string> {
    return this.http.post(`${this.baseUrl}`, {username, password, email, roles}, {responseType: 'text'});
  }
}

import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private baseUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) {
  }

  createCharacter(authorName: string, creator: object): Observable<object> {
    return this.http.post(`${this.baseUrl}` + 'characters/' + authorName, creator,
      {headers: new HttpHeaders({Authorization: sessionStorage.getItem('token')})});
  }


  getCharacterList(): Observable<any> {
    console.log((sessionStorage.getItem('token')));
    return this.http.get(`${this.baseUrl}` + 'character-list',
      {headers: new HttpHeaders({Authorization: sessionStorage.getItem('token')})});
  }

  getCharacter(id: number): Observable<object> {
    return this.http.get(`${this.baseUrl}characters/${id}`,
      {headers: new HttpHeaders({Authorization: sessionStorage.getItem('token')})});
  }

  updateCharacter(id: number, value: any): Observable<object> {
    return this.http.put(`${this.baseUrl}characters/${id}`, value,
      {headers: new HttpHeaders({Authorization: sessionStorage.getItem('token')})});
  }

  deleteCharacter(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}characters/${id}`,
      {responseType: 'text', headers: new HttpHeaders({Authorization: sessionStorage.getItem('token')})});
  }
}

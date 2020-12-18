import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreatorService {

  private baseUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) {
  }


  getCreatorList(): Observable<any> {
    console.log((sessionStorage.getItem('token')));
    return this.http.get(`${this.baseUrl}` + 'creators-list',
      {headers: new HttpHeaders({Authorization: sessionStorage.getItem('token')})});
  }

  getCreator(id: number): Observable<object> {
    return this.http.get(`${this.baseUrl}creators/${id}`,
      {headers: new HttpHeaders({Authorization: sessionStorage.getItem('token')})});
  }

  createCreator(creator: object): Observable<object> {
    return this.http.post(`${this.baseUrl}` + 'creators', creator,
      {headers: new HttpHeaders({Authorization: sessionStorage.getItem('token')})});
  }

  deleteCreator(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}creators/${id}`,
      {responseType: 'text', headers: new HttpHeaders({Authorization: sessionStorage.getItem('token')})},
    );
  }

  updateCreator(id: number, value: any): Observable<object> {
    return this.http.put(`${this.baseUrl}creators/${id}`, value,
      {headers: new HttpHeaders({Authorization: sessionStorage.getItem('token')})});
  }
}

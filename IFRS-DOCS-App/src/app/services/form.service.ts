import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Form } from '../models/Form';

@Injectable({
  providedIn: 'root'
})
export class FormService {

constructor(private http: HttpClient) { }
  baseUrl = 'https://localhost:44325/api/form';

  getFormByUser(userId: number): Observable<Form[]>{
    return this.http.get<Form[]>(`${this.baseUrl}/getByUser/${userId}`);
  }
}

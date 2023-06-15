import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { Form } from '../models/Form';
import { PaginatedResult } from '../models/Pagination';
import { environment } from 'src/environments/environment';
import { Course } from '../models/Course';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  
constructor(private http: HttpClient) { }

  reqHeaders = new HttpHeaders().set('Content-Type','application/json');

  getForms(page?: number, itemsPerPage?: number, term?: string): Observable<PaginatedResult<Form[]>> {
    const paginatedResult: PaginatedResult<Form[]> = new PaginatedResult<Form[]>();

    let params = new HttpParams;

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }

    if (term != null && term != '')
      params = params.append('term', term)

    return this.http
      .get<Form[]>(`${environment.apiEndpoint}/form`, {observe: 'response', params })
      .pipe(
        take(1),
        map((response) => {
          paginatedResult.result = response.body as Form[];
          if(response.headers.has('Pagination')) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination') as string);
          }
          return paginatedResult;
        }));    
  }

  getAllCourses(){
    return this.http.get<Course[]>(`${environment.apiEndpoint}/course/getAll`);
  }
}

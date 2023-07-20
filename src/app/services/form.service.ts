import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { Form } from '../models/Form';
import { PaginatedResult } from '../models/Pagination';
import { environment } from 'src/environments/environment';
import { Course } from '../models/Course';
import { DocumentOption } from '../models/DocumentOption';
import { RequestNewForm } from '../models/RequestNewForm';
import { UpdateFormStatusDto } from '../models/UpdateFormStatusDto';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http: HttpClient) { }

  reqHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  getForms(page?: number, itemsPerPage?: number, term?: string): Observable<PaginatedResult<Form[]>> {
    const paginatedResult: PaginatedResult<Form[]> = new PaginatedResult<Form[]>();

    let params = new HttpParams;

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }

    if (term != null && term != '')
      params = params.append('name', term)

    return this.http
      .get<Form[]>(`${environment.apiEndpoint}/form`, { observe: 'response', params })
      .pipe(
        take(1),
        map((response) => {
          paginatedResult.result = response.body as Form[];
          if (response.headers.has('Pagination')) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination') as string);
          }
          return paginatedResult;
        }));
  }

  getAllCourses() {
    return this.http.get<Course[]>(`${environment.apiEndpoint}/course/GetAll`);
  }

  getDocumentOptionByDocumentType(documentType: number) {
    return this.http.get<DocumentOption[]>(`${environment.apiEndpoint}/DocumentOption/GetByDocumentType/${documentType}`);
  }

  postForm(form: RequestNewForm): Promise<Form> {
    return this.http.post<Form>(`${environment.apiEndpoint}/Form`, form).toPromise();
  }

  getFormById(id: number): Observable<Form> {
    return this.http.get<Form>(`${environment.apiEndpoint}/Form/${id}`);
  }

  updateFormStatus(updateFormStatusDto: UpdateFormStatusDto): Promise<Form> {
    try {
      return this.http.put<Form>(`${environment.apiEndpoint}/Form/UpdateStatus/${updateFormStatusDto.formId}`, updateFormStatusDto).toPromise();
    } catch (error) {
      throw new Error('Erro na Requisição PUT: ' + error)
    }
  }

  updateFormStatusAndSendFiles(updateFormStatusDto: UpdateFormStatusDto): Promise<Form> {

    try {
      const formData = new FormData();
      formData.append('formId', updateFormStatusDto.formId.toString());
      formData.append('status', updateFormStatusDto.status.toString());
      formData.append('userId', updateFormStatusDto.userId.toString());
      updateFormStatusDto.files.forEach((file, index) => {
        formData.append(`files[${index}]`, file);
      });

      return this.http.put<Form>(`${environment.apiEndpoint}/Form/UpdateStatusAndSendFiles/${updateFormStatusDto.formId}`, formData).toPromise();
    } catch (error) {
      throw new Error('Erro na Requisição PUT: ' + error)
    }
  }
}

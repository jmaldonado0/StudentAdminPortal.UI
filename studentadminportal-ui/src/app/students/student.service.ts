import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../Models/API-Models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseApiUrl = 'https://localhost:44398';

  constructor(private httpClient: HttpClient) { }

  getStudent(): Observable<Student[]> {
   return  this.httpClient.get<Student[]>(this.baseApiUrl + '/students');
  }
}

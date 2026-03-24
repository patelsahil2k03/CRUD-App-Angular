import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tutorial } from '../models/tutorial.model';
import { environment } from 'src/environments/environment';

const baseUrl = environment.apiBaseUrl;

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(baseUrl);
  }

  get(id: number | string): Observable<Tutorial> {
    return this.http.get<Tutorial>(`${baseUrl}/${id}`);
  }

  create(data: Pick<Tutorial, 'title' | 'description'>): Observable<Tutorial> {
    return this.http.post<Tutorial>(baseUrl, data);
  }

  update(id: number | string, data: Partial<Tutorial>): Observable<{ message?: string }> {
    return this.http.put<{ message?: string }>(`${baseUrl}/${id}`, data);
  }

  delete(id: number | string): Observable<{ message?: string }> {
    return this.http.delete<{ message?: string }>(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<{ message?: string }> {
    return this.http.delete<{ message?: string }>(baseUrl);
  }

  findByTitle(title: string): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(`${baseUrl}?title=${title}`);
  }
}

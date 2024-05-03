import { Injectable } from '@angular/core';
import {Question} from "../../forum/question";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedDService {

  constructor(private http: HttpClient ) {}
  private url = 'http://localhost:8082/';
  getAllPosts() {
    return this.http.get<Question[]>(this.url + 'Questions');
  }

  deletepost(id: number): Observable<any> {
    return this.http.delete(this.url + "DeleteQuestion/" + id)
        .pipe(
            catchError(error => {
              console.error('Error deleting question:', error);
              return throwError(error); // Or handle error differently
            })
        );
  }
}

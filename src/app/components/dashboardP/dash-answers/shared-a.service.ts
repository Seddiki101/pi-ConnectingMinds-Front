import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Reponse} from "../../forum/reponse";

@Injectable({
  providedIn: 'root'
})
export class SharedAService {

  constructor(private http: HttpClient) { }

  private url = 'http://localhost:8090/';
  getReponseById(idQuestion: number): Observable<Reponse[]>{
    const baseurl = `${this.url}AnswersByQuestion/${idQuestion}`;
    return this.http.get<Reponse[]>(baseurl);
  }

  deleteAnswer(id: number): Observable<any> {
    return this.http.delete(this.url + "DeleteAnswer/" + id)
        .pipe(
            catchError(error => {
              console.error('Error deleting answer:', error);
              return throwError(error); // Or handle error differently
            })
        );
  }


}

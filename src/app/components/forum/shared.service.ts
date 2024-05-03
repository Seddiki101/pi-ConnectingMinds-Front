import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Question} from "./question";
import {catchError, Observable, tap, throwError} from 'rxjs';
import {Reponse} from "./reponse";


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) { }

  private url = 'http://localhost:8090/';
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

    CreateNewPost(formData: FormData): Observable<any> { // Change the argument type to FormData
        return this.http.post<any>(this.url + 'AjouterQuestion', formData)
            .pipe(
                tap(savedQuestion => console.log('Created question:', savedQuestion)), // Log success
                catchError(error => {
                    console.error('Error creating post:', error);
                    return throwError(error);
                })
            );
    }
    getPostById(id:any){
        return this.http.get(this.url+'getQuestionById/'+id);
    }
    UpdateQuestion(id: any, formData: FormData) {
        return this.http.put(this.url + 'updateQuestion/' + id, formData)
            .pipe(
                catchError(error => {
                    console.error('Error updating question:', error);
                    return throwError(error);
                })
            );
    }

    getReponseById(idQuestion: number): Observable<Reponse[]>{
        const baseurl = `${this.url}AnswersByQuestion/${idQuestion}`;
        return this.http.get<Reponse[]>(baseurl);
    }
/////// Add answer
    addResponse(idQuestion: number, contenu: string): Observable<Reponse> {
        // Créer un objet FormData pour envoyer les données
        const formData = new FormData();
        formData.append('contenu', contenu);
        // formData.append('imageFile', imageFile);

        // Définir les en-têtes pour spécifier le type de contenu multipart
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'multipart/form-data');

        // Faire la requête POST vers le backend
        return this.http.post<Reponse>(`${this.url}addResponse/${idQuestion}`, formData, { headers: headers })
            .pipe(
                catchError(error => {
                    console.error('Error adding response:', error);
                    return throwError(error);
                })
            );
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

    UpdateAnswer(id: any, formData: FormData) {
        return this.http.put(this.url + 'updateReponse/' + id, formData)
            .pipe(
                catchError(error => {
                    console.error('Error updating answer:', error);
                    return throwError(error);
                })
            );
    }

    getAnswerById(id:any){
        return this.http.get(this.url+'getReponseById/'+id);
    }

    searchPosts(contenu: string): Observable<Question[]> {
        return this.http.get<Question[]>(`${this.url}search?contenu=${contenu}`);
    }
}

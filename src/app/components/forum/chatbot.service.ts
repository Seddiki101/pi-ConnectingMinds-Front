import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  apiUrl = 'http://localhost:8090/hitOpenAiApi';

  constructor(private http: HttpClient) { }
  sendMessage(message: string) {
    const requestData = { prompt: message };
    return this.http.post<string>(this.apiUrl, requestData)
        .pipe(
            catchError(error => {
              if (error instanceof HttpErrorResponse && error.status === 200) {
                console.error('Error parsing response: ', error.error.text);
                // Display a user-friendly error message to the user (e.g., "An unexpected error occurred. Please try again later.")
                return throwError('Failed to parse response from server.'); // Or return an observable with an appropriate error message
              }
              return throwError(error); // Re-throw other errors
            })
        );
  }

}

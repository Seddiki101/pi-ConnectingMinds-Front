import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
interface Reservation {
  nomParticipant: string;
  prenomParticipant: string;
}
@Injectable({
  providedIn: 'root'
})
export class ResServiceService {

  constructor(private http:HttpClient) { }
  private url='http://localhost:8089/reservations/';

  ajouterReservation(reservation: Reservation, id: any): Observable<any> {
    return this.http.post(this.url + "addReservation/"+ id, reservation);
  }

  getAllreservation(){
    return this.http.get(this.url+ "listRes");
  }
  deleteReservation(id: number): Observable<any> {
    return this.http.delete(this.url + 'delete/' + id);
  }


}

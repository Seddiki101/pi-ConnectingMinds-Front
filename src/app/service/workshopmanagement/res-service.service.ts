import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import {environment} from "../../../environments/environment";
import { TokenService } from '../usermanagement/token-svc/token-service.service';

interface Reservation {
  nomParticipant: string;
  prenomParticipant: string;
}
@Injectable({
  providedIn: 'root'
})
export class ResServiceService {

  constructor(private http:HttpClient,  private  tokenService:TokenService ) { }
  private url=environment.workshop+'/reservations/';

  ajouterReservation(reservation: Reservation, id: any): Observable<any> {
    return this.http.post(this.url + "addReservation/"+ id, reservation,  { headers: this.tokenService.getHeaders() });
  }

  getAllreservation(){
    return this.http.get(this.url+ "listRes");
  }
  deleteReservation(id: number): Observable<any> {
    return this.http.delete(this.url + 'delete/' + id);
  }

   getReservationsForWorkshop(idWorkshop: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.url}workshops/${idWorkshop}`);
  }

}

import {Component, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {environment} from "../../../environments/environment";
import { TokenService } from '../usermanagement/token-svc/token-service.service';

@Injectable({
  providedIn: 'root'
})

export class SharedWService {

  workshops: any[]=[];
  constructor(private http:HttpClient, private  tokenService:TokenService ) { }
  private url=environment.workshop+'/workshops/';



  getAllworkshops(){
    return this.http.get(this.url + 'get-all');
  }
  getWorkshopById(id: any) {
    return this.http.get(this.url + 'get/' + id);
  }

  getAvailableCapacity(id: number): Observable<number> {
    return this.http.get<number>(this.url + id + '/availableCapacity');
  }

  addWorkshop(workshops: any){
    return this.http.post(this.url + 'add', workshops, { headers: this.tokenService.getHeaders() });
  }

  deleteWorkshop(id: number): Observable<any> {
    return this.http.delete(this.url + 'delete/' + id);
  }

  updateWorkshop(id: any,  workshops:any){

    return this.http.put(this.url + 'update/' + id, workshops);
  }

}

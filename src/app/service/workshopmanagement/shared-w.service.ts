import {Component, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
@Injectable({
  providedIn: 'root'
})

export class SharedWService {

  workshops: any[]=[];
  constructor(private http:HttpClient) { }
  private url='http://localhost:8089/workshops/';


  getAllworkshops(){
    return this.http.get(this.url + 'get-all');
  }
  getWorkshopById(id: any) {
    return this.http.get(this.url + 'get/' + id);
  }

  addWorkshop(workshops: any){
    return this.http.post(this.url + 'add', workshops);
  }

  deleteWorkshop(id: number): Observable<any> {
    return this.http.delete(this.url + 'delete/' + id);
  }

  updateWorkshop(id: any,  workshops:any){

    return this.http.put(this.url + 'update/' + id, workshops);
  }

}

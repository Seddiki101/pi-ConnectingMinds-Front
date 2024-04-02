import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  constructor(private http: HttpClient) { }
  private url = 'http://127.0.0.1:8081/';

  getAllResources(){

    return this.http.get( this.url + 'all-resources' );

  }
}

import { Injectable } from '@angular/core';
import { HttpClient , HttpEventType, HttpHeaders, HttpResponse  } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TokenService } from '../usermanagement/token-svc/token-service.service';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  constructor(private http:HttpClient, private  tokenService:TokenService ) { }


  private url = environment.resource;

  getAllResources(){

    return this.http.get( this.url + 'all-resources' );

  }
  getAllResourcesByUser(id:any){

    return this.http.get( this.url + 'all-resources/'+id );

  }
  getAllPopularResources(){

    return this.http.get( this.url + 'all-popular-resources' );

  }
  getAllCategories(){

    return this.http.get( this.url + 'all-categories' );

  }
  createNewResource( content: File){
    const formData: FormData = new FormData();
    formData.append('content', content );
   // formData.append('resource',resource);

 

   
    return this.http.post( this.url + 'addResource' ,formData );
 
   }
  

   createNewResource2( resource : any ){
    const formData: FormData = new FormData();
    formData.append('resource', resource );
   // formData.append('resource',resource);

 

   
    return this.http.post( this.url + 'addResource2' ,resource);
 
   }

   getResourceById(id: any){
    return this.http.get(this.url + 'getResourceById/' + id);
    
  }

  likeResource(id: any){
    const url1 =`${this.url}like/${id}`;

    return this.http.get(url1);
    
  }

  UpdateResource(resource : any , id : any){

    const url1 =`${this.url}updateResource/${id}`;

    return this.http.put(url1,resource);
  }

  DeleteResource( id : any){

    return this.http.delete(this.url+'deleteResource/'+id);
  }

 

  ////////////////////reviews////////////////////////////////////

  createNewReview( review : any ){
    const formData: FormData = new FormData();
    formData.append('review', review);
   

 

   
    return this.http.post( this.url + 'addReview' ,review, { headers: this.tokenService.getHeaders() });
 
   }
   getAllReviewsOfOneResource(id: any){

    return this.http.get( this.url + 'all-reviewsByResource/'+id );

  }

  getReviewById(id: any){

    return this.http.get( this.url + 'getReviewById/'+id );

  }
  UpdateReview(review : any , id : any){

    const url1 =`${this.url}updateReview/${id}`;

    return this.http.put(url1,review);
  }
  DeleteReview( id : any){

    return this.http.delete(this.url+'deleteReview/'+id);
  }
}

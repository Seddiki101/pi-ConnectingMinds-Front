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

   createNewResource( content: File ,resource:any){
    

    const formData: FormData = new FormData();
    if (content) {
      formData.append('content', content);
    }else {formData.append('content', "null");}
   
    formData.append('name', resource.name );
    formData.append('description', resource.description );
    formData.append('url', resource.url);
    formData.append('categoryId', resource.categoryId);
   // formData.append('resource',resource);
   console.log("from service"+formData);

 

   
    return this.http.post( this.url + 'addResource' ,formData , { headers: this.tokenService.getHeaders() });
 
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

  ///////////////////////Catgory///////////////////////////////
  createNewCategory( image: File,category:any){
    const formData: FormData = new FormData();
    formData.append('image', image );
    formData.append('name', category.name );
    formData.append('description', category.description );

   // formData.append('resource',resource);

 

   
    return this.http.post( this.url + 'addCategory' ,formData);
 
   }
}
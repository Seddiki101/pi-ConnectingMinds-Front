import { Component } from '@angular/core';
import { ResourcesService } from '../../../service/ressource-management-service/resources.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-show-resource',
  templateUrl: './show-resource.component.html',
  styleUrls: ['./show-resource.component.css']
})
export class ShowResourceComponent {
  liked=false;
  resource :any ;
  toUpdateReview:any ;
  reviews : any ;
  likes:number=0;
  id : any ;
  Id =1 ; //user connecté
  review : any ={
    content:'',
    userId:this.Id,
    resource:null 

  }

  showNewReview=false ;
  showUpdate=false ;
  
  newReview :any ={
    content:'',
    userId:this.Id,
    resource:null 

  }
  UpdatedReview :any ={
    content:'',
    userId:this.Id,
    resource:null 

  }
 
  constructor( public _service : ResourcesService ,private act: ActivatedRoute) { }

  ngOnInit(): void {
   this.id = this.act.snapshot.paramMap.get('id')
   this._service.getResourceById(this.id).subscribe(
    res=>{
      console.log(res);
  
      this.resource = res;
      this.likes=this.resource.likes;
      this.review.resource=this.resource;
      
      
    },
    err=>{
      console.log(err);
      
    }
  );

  this._service.getAllReviewsOfOneResource(this.id).subscribe(
    res=>{
      console.log(res);
  
      this.reviews = res;
      
    },
    err=>{
      console.log(err);
      
    }
  );
    

  }
  onInputChange(value: string) {
    console.log('Input changed:', value);
    this.review.content = value; // Mettez à jour review.content avec la valeur du champ de texte
  }
  

  ajoutReview(){
    
  this._service.createNewReview(this.review).subscribe(
    res=>{
      console.log(this.review.content);
      console.log(res);
      console.log(this.review);
      this.newReview.content=this.review.content;
      this.newReview.userId=this.review.userId;
      this.newReview.resource=this.review.resource;

      this.review={
        content:'',
        userId:this.Id,
        resource:null 
    
      }
      
      this.showNewReview=true;
      console.log(this.newReview);

  
      
      
      
    },
    err=>{
      console.log(err);
      console.log(this.review);
      
    }
  );
  
  }
  update (id :any){

    this.showNewReview=false;
    this.showUpdate=true ;
    this._service.getReviewById(id).subscribe(
      res=>{
        console.log(res);
    
        this.toUpdateReview = res;
        
      },
      err=>{
        console.log(err);
        
      }
    );
   

  }
  close (){
    this.showNewReview=true;
    this.showUpdate=false ;


  }
  saveUpdate(){
    this.UpdatedReview.resource=this.toUpdateReview.resource;

    this._service.UpdateReview(this.UpdatedReview,this.toUpdateReview.reviewId).subscribe(
      res=>{
        console.log(res);
    
        this.UpdatedReview = res;
        
        this.UpdatedReview={
          content:'',
          userId:this.Id,
          resource:null 
      
        }
        location.reload();
      },
      err=>{
        console.log(err);
        console.log(this.UpdatedReview.content);
        console.log(this.UpdatedReview);
        console.log(this.toUpdateReview.reviewId);

        
      }
    );
  }
 delete(id :any ){
  

    this._service.DeleteReview(id).subscribe(
      res=>{
        console.log(res);
       
    
        
        
   
        location.reload();
      },
      err=>{
        console.log(err);
        location.reload();
       

        
      }
    );
  }
  like(id :any){
    this.liked=true ;
    this.likes=this.likes+1;
    
    this._service.likeResource(id).subscribe(
      res=>{
        console.log(res);
       
    
        
        
   
      },
      err=>{
        console.log(err);
     
       

        
      }
    );



  }



}

import { Component } from '@angular/core';
import { ResourcesService } from '../../../service/ressource-management-service/resources.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-show-resource',
  templateUrl: './show-resource.component.html',
  styleUrls: ['./show-resource.component.css']
})
export class ShowResourceComponent {
  safeVideoUrl: SafeResourceUrl;
  pdfName: string;
  safePdfUrl: SafeResourceUrl;
  searchedReviews :any ;
  initialReviews :any ;
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
 
  constructor( public _service : ResourcesService ,private act: ActivatedRoute,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
   this.id = this.act.snapshot.paramMap.get('id')
   this._service.getResourceById(this.id).subscribe(
    res=>{
      console.log(res);
  
      this.resource = res;
      this.likes=this.resource.likes;
      this.review.resource=this.resource;
      this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.resource.url);

     // this.safePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.resource.content);
     // this.pdfName = this.extractPdfName(this.resource.content); // Extraire le nom du PDF


      
      
    },
    err=>{
      console.log(err);
      
    }
  );

  this._service.getAllReviewsOfOneResource(this.id).subscribe(
    res=>{
      console.log(res);
  
      this.reviews = res;
      this.initialReviews = res;
      
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
  performSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value.trim(); // Cast and safely access the value
    if (!value) {
      this.searchedReviews = [];
      this.reviews=this.initialReviews;
      console.log("if");
    } else {
        this.searchedReviews = this.reviews.filter((r:any)=>
            r.content.toLowerCase().includes(value.toLowerCase()) 
        );
        this.reviews=this.searchedReviews;
        console.log(this.searchedReviews);
        console.log("else");
    }
}

downloadPdf(name:any): void {
  const contentUrl = this.resource.content;
  const pdfName = name;
  const link = document.createElement('a');
  link.href = contentUrl;
  link.download = pdfName;
  link.click();
}


}
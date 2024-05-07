import { Component } from '@angular/core';
import { ResourcesService } from '../../../service/ressource-management-service/resources.service';

@Component({
  selector: 'app-ajout-resource',
  templateUrl: './ajout-resource.component.html',
  styleUrls: ['./ajout-resource.component.css']
})
export class AjoutResourceComponent {
  

 
  resources: any;
  categories: any ;
  Id =1 ; //user connecté


  selectedCategory: any;
  resource : any ={
    name:'',
    description:'',
    url:'',
    userId :this.Id ,
    categoryId:0

   
   


  };
 
  
  category:any={
    name:'',
    description:''
  }
  selectedCategoryNewImage :any;
  selectedCategoryNewImageUrl: string | null = null;


  selectedFile : any;
  selectedFileUrl: string | null = null;
  showLinkInput = false;
  showVideoInput = false;
  showFileInput = false;
  showPhotoInput = false;
  showAddCategory=false;

  
  uploadProgress: number=0;
  

  constructor( public _service : ResourcesService  ) { }
  
 

  onFileSelected(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList && fileList.length > 0) {
      this.selectedFile = fileList[0];
      this.selectedFileUrl = URL.createObjectURL(this.selectedFile);

    }else{
      this.selectedFile=null;
      this.selectedFileUrl = URL.createObjectURL(this.selectedFile);
    }
  }
  onFileSelectedCategory(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList && fileList.length > 0) {
      this.selectedCategoryNewImage = fileList[0];
      this.selectedCategoryNewImageUrl = URL.createObjectURL(this.selectedCategoryNewImage);
    }
  }
  

  ngOnInit(): void {

    this._service.getAllResources().subscribe(
      res=>{
        console.log(res);
        this.resources = res;
      },
      err=>{
        console.log(err);
        
      }
    );

    this._service.getAllCategories().subscribe(
      res=>{
        console.log(res);
        this.categories = res;
      },
      err=>{
        console.log(err);
        
      }
    );




  }
  onSelected(event:any): void {
    
		this.selectedCategory = event;
    console.log(this.selectedCategory);
    
	}

  


  ajout(){


    this._service.createNewResource(this.selectedFile,this.resource)
      .subscribe(
        res=>{
          console.log(res);
        
     
          
        },
        err=>{
          console.log(err);
          console.log(this.resource);
          console.log(this.selectedFile);
          
          
        }
      );







    
  }

  ajoutCategory(){

    
    this._service.createNewCategory(this.selectedCategoryNewImage,this.category)
      .subscribe(
        res=>{
          console.log(res);
          location.reload();
        
     
          
        },
        err=>{
          console.log(err);
          
        }
      );


      




    
  }

  toggleFileInput() {
    this.showFileInput = !this.showFileInput;
    this.showLinkInput = false; // Réinitialiser le style de l'autre bouton
    this.showPhotoInput =false ;
    this.showVideoInput =false ;
  }

  toggleLinkInput() {
    this.showLinkInput = !this.showLinkInput;
    this.showFileInput = false; // Réinitialiser le style de l'autre bouton
    this.showPhotoInput =false ;
    this.showVideoInput =false ;
  }
  togglePhotoInput() {
    this.showPhotoInput = !this.showPhotoInput;
    this.showFileInput = false; // Réinitialiser le style de l'autre bouton
    this.showLinkInput =false ;
    this.showVideoInput =false ;
  }
  toggleVideoInput() {
    this.showVideoInput = !this.showVideoInput;
    this.showFileInput = false; // Réinitialiser le style de l'autre bouton
    this.showLinkInput =false ;
    this.showPhotoInput =false ;
  }
  onCategoryChange(event: any) {
    this.selectedCategory = event.target.value; // Update the selectedCategory property
    this.resource.categoryId=  this.selectedCategory; 
    
}
close(){
   
  this.showAddCategory=false ;

}
SowAddCat(){
  this.showAddCategory=true ;
}


}
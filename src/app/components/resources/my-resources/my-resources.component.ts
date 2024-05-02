import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourcesService } from '../../../service/ressource-management-service/resources.service';

@Component({
  selector: 'app-my-resources',
  templateUrl: './my-resources.component.html',
  styleUrls: ['./my-resources.component.css']
})
export class MyResourcesComponent {
  id : any ;
  searchedResources :any ;
  resources :any ;
  showUpdate=false ;
  toUpdateResource:any ;
  UpdatedResource :any ={
    description:''

  }

  constructor( public _service : ResourcesService ,private act: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.act.snapshot.paramMap.get('id')
    this._service.getAllResourcesByUser(this.id).subscribe(
      res=>{
        console.log(res);
      
        this.resources = res;
        //this.base64Data = this.resources.content.picByte;
        //this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data
      },
      err=>{
        console.log(err);
        console.log(this.resources);
        
      }
    );
  
  
  }
  update (id :any){

   
    this.showUpdate=true ;
    this._service.getResourceById(id).subscribe(
      res=>{
        console.log(res);
    
        this.toUpdateResource = res;
        
      },
      err=>{
        console.log(err);
        
      }
    );
   

  }
  saveUpdate(){
 

    this._service.UpdateResource(this.UpdatedResource,this.toUpdateResource.resourceId).subscribe(
      res=>{
        console.log(res);
    
        this.UpdatedResource = res;
        
        this.UpdatedResource={
          description:''
      
      
        }
        location.reload();
      },
      err=>{
        console.log(err);
     
        
      }
    );
  }
  close (){
   
    this.showUpdate=false ;


  }
  delete(id :any ){
  

    this._service.DeleteResource(id).subscribe(
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

  searchResources(event: any) {
    const searchTerm = (event.target as HTMLInputElement).value; 

    if (searchTerm) {
      this._service.SearchResources(searchTerm).subscribe((data: any) => {
        this.searchedResources = data; // Mettez à jour les ressources recherchées avec les données de votre service
      });
    
    } 
    else {
      this.searchedResources = null; // Réinitialisez les ressources recherchées si le terme de recherche est vide
    }
 
  }


}

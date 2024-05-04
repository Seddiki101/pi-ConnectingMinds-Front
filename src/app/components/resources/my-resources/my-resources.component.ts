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
  initialResources :any ;
  showUpdate=false ;
  showDelete=false ;
  toUpdateResource:any ;
  toRemoveResource:any ;
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
        this.initialResources = res;
        //this.base64Data = this.resources.content.picByte;
        //this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data
      },
      err=>{
        console.log(err);
        console.log(this.resources);
        
      }
    );
  
  
  }
  showDeletepopUp(id :any){
    this.showDelete=true ;
    this.toRemoveResource=id;


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
  close1(){
   
    this.showUpdate=false ;

  }
  close2(){
   
    this.showDelete=false ;

  }
  delete(){
  

    this._service.DeleteResource(this.toRemoveResource).subscribe(
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
  performSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value.trim(); // Cast and safely access the value
    if (!value) {
      this.searchedResources = [];
      this.resources=this.initialResources;
      console.log("if");
    } else {
        this.searchedResources = this.resources.filter((r:any)=>
            r.name.toLowerCase().includes(value.toLowerCase()) ||
            r.description.toLowerCase().includes(value.toLowerCase())
        );
        this.resources=this.searchedResources;
        console.log(this.searchedResources);
        console.log("else");
    }
}


}

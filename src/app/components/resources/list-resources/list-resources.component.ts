import { Component, OnInit } from '@angular/core';
import { ResourcesService } from '../../../service/ressource-management-service/resources.service';
import { TokenService } from 'src/app/service/usermanagement/token-svc/token-service.service';
import { AuthenticService } from 'src/app/service/usermanagement/authentic/authentic.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-list-resources',
  templateUrl: './list-resources.component.html',
  styleUrls: ['./list-resources.component.css']
})
export class ListResourcesComponent {
  Id:number; // id du user connecté 
  searchedResources :any ;
  initialResources :any ;
  resources: any;
  popular_resources : any ;
  categories: any ;
  selectedCategory: any;
  retrievedImage: any;
  base64Data: any;
  resource ={
    name:'',
    description:'',
    url:'',


  }
  

  constructor( public _service : ResourcesService ,private tokenService: TokenService ,private authsvc:AuthenticService ) { }

  ngOnInit(): void {


    this.authsvc.getId().subscribe((i: number) => {
      if (i != null) {
        console.log("aa" + i);
        this.Id = i;
      }
    });



    this._service.getAllResources().subscribe(
      res=>{
        console.log(res);
       // console.log(this.resources.content);
        this.resources = res;
        this.initialResources = res;
        console.log(this.resources);
        //this.base64Data = this.resources.content.picByte;
        //this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data
      },
      err=>{
        console.log(err);
        console.log(this.resources);
        
      }
    );
    this._service.getAllPopularResources().subscribe(
      res=>{
        console.log(res);
        this.popular_resources = res;
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
  onCategoryChange(categoryId: any) {
    console.log('Selected Category:', categoryId);
    // Ajoutez ici le code pour traiter la catégorie sélectionnée
  }
  selected = "Choose Category"
  
  update(e:any){ 
    this.selected = e.target.value 
  
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
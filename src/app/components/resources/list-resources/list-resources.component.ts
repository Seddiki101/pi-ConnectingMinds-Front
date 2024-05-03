import { Component, OnInit } from '@angular/core';
import { ResourcesService } from '../../../service/ressource-management-service/resources.service';


@Component({
  selector: 'app-list-resources',
  templateUrl: './list-resources.component.html',
  styleUrls: ['./list-resources.component.css']
})
export class ListResourcesComponent {
  Id=1; // id du user connecté 
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
  

  constructor( public _service : ResourcesService ) { }

  ngOnInit(): void {

    this._service.getAllResources().subscribe(
      res=>{
        console.log(res);
        console.log(this.resources.content);
        this.resources = res;
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

 

}

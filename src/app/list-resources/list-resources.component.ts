import { Component, OnInit } from '@angular/core';
import { ResourcesService } from '../resources.service';


@Component({
  selector: 'app-list-resources',
  templateUrl: './list-resources.component.html',
  styleUrls: ['./list-resources.component.css']
})
export class ListResourcesComponent {
  resources: any;

  constructor( public _service : ResourcesService ) { }

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




  }

}

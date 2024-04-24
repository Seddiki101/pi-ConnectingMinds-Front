import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedWService } from '../../../service/workshopmanagement/shared-w.service';

@Component({
  selector: 'app-update-w',
  templateUrl: './update-w.component.html',
  styleUrls: ['./update-w.component.css']
})
export class UpdateWComponent implements OnInit {
    // workshops: any;
    id: any;
    workshops: any = {
        title: '',
        description: '',
        dateDeb: '',
        dateFin: '',
        prix: 0.0,
        maxCapacity: 0,
        currentCapacity: 0,
        localisation: '',
        image: null
    };
    selectedFile: File ;

    constructor(private act: ActivatedRoute, private Shared: SharedWService) {
    }


   /* onSubmit(){
       this.Shared.updateWorkshop(this.id, this.workshops)
         .subscribe(
           res=>{
             console.log(res);
           },
           err=>{
             console.log(err);
           }
         )
     }

     ngOnInit(): void {

       this.id=this.act.snapshot.paramMap.get('id');
       this.Shared.getWorkshopById(this.id)
         .subscribe(
           res=>{
             this.workshops=res;
           },
           err=>{
             console.log(err);
           }
         )
     }*/
    ngOnInit(): void {
        this.id = this.act.snapshot.paramMap.get('id');
        this.Shared.getWorkshopById(this.id).subscribe(
            res => {
                this.workshops = res;
            },
            error => {
                console.log(error);
            }
        );
    }

    updateWorkshop() {
        const formData = new FormData();
        formData.append('title', this.workshops.title);
        formData.append('description', this.workshops.description);
        formData.append('dateDeb', this.workshops.dateDeb);
        formData.append('dateFin', this.workshops.dateFin);
        formData.append('prix', this.workshops.prix);
        formData.append('maxCapacity', this.workshops.maxCapacity);
        formData.append('currentCapacity', this.workshops.currentCapacity);
        formData.append('localisation', this.workshops.localisation);
        formData.append('image', this.workshops.image);

        this.Shared.updateWorkshop(this.id, formData).subscribe(
            res => {
                console.log(res);
            },
            error => {
                console.error(error);
            }
        );
    }

    onFileSelected(event: any) {
        const file: File = event.target.files[0];
        if (file) {
            this.workshops.image = file;
        }
    }

       /*onFileSelected(event : any) {
           if (event.target.files.length > 0) {
               this.workshops.image = event.target.files[0];
           }
       }*/

}

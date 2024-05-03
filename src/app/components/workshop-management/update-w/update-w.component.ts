import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedWService } from '../../../service/workshopmanagement/shared-w.service';
import { ToastrService } from 'ngx-toastr';


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
    };

    constructor(private act: ActivatedRoute, private Shared: SharedWService, private router: Router, private toastr: ToastrService) {
    }


   onSubmit(){
       this.Shared.updateWorkshop(this.id, this.workshops)
         .subscribe(
           res=>{
             console.log(res);
               this.toastr.success("Votre workshop est bien mis à jour")
               this.router.navigate(['/list']);
           },

           err=>{
               this.toastr.error("Error lors de mis à jour de workshop")
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
     }

}
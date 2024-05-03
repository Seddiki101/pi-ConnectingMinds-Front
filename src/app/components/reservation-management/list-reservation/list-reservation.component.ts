import { Component } from '@angular/core';
import {SharedWService} from "../../../service/workshopmanagement/shared-w.service";
import {Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {MatDialog} from "@angular/material/dialog";
import {ResServiceService} from "../../../service/workshopmanagement/res-service.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-list-reservation',
  templateUrl: './list-reservation.component.html',
  styleUrls: ['./list-reservation.component.css']
})
export class ListReservationComponent {
  reservations: any[];
  constructor(private resService: ResServiceService, private router: Router, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.getAllreservation();
  }
    getAllreservation() {
    this.resService.getAllreservation().subscribe(
        (res: any) => {
          console.log(res);
          this.reservations=res;
        },
        (err: any) => {
          console.error(err);
        }
    );
  }
    onDeleteWorkshop(idReservation: number) {
        this.resService.deleteReservation(idReservation).subscribe(
            res => {
                this.toaster.success("Votre réservation a été annulé avec succès");
                this.getAllreservation();
            },
            error => {
                console.error('Error deleting reservation:', error);
                this.toaster.error("Votre réservation ne peux pas être annulée");
            }
        );
    }
}

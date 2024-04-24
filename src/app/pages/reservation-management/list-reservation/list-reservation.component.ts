import { Component } from '@angular/core';
import {SharedWService} from "../../../service/workshopmanagement/shared-w.service";
import {Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {MatDialog} from "@angular/material/dialog";
import {ResServiceService} from "../../../service/workshopmanagement/res-service.service";

@Component({
  selector: 'app-list-reservation',
  templateUrl: './list-reservation.component.html',
  styleUrls: ['./list-reservation.component.css']
})
export class ListReservationComponent {
  reservations: any[];
  constructor(private resService: ResServiceService, private router: Router) { }

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
                alert('Reservation deleted successfully!');
                this.getAllreservation(); // Recharger la liste après suppression
            },
            error => {
                console.error('Error deleting reservation:', error);
                alert('Failed to delete reservation.');
            }
        );
    }
}

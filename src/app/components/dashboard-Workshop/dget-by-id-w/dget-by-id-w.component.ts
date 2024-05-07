import { Component } from '@angular/core';
import {SharedWService} from "../../../service/workshopmanagement/shared-w.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import { ResServiceService } from 'src/app/service/workshopmanagement/res-service.service';

@Component({
  selector: 'app-dget-by-id-w',
  templateUrl: './dget-by-id-w.component.html',
  styleUrls: ['./dget-by-id-w.component.css']
})
export class DGetByIdWComponent {
  workshops: any;
  id: any;
  availableCapacity: number;
  reservations: any[];
  idWorkshop:any;
  reservationCount: number;

  constructor(private act: ActivatedRoute,private shared: SharedWService, private sanitizer: DomSanitizer, public dialog: MatDialog, private toaster: ToastrService, private router: Router, private resService: ResServiceService) {
  }

  ngOnInit(): void {
    this.getWorkshopById();
    this.getReservationsForWorkshop();
   

  }
  getWorkshopById() {
  this.id = this.act.snapshot.paramMap.get('id');
  this.shared.getWorkshopById(this.id).subscribe(
    (res: any) => {
      console.log(res);
      this.workshops = res;
      this.getAvailableCapacity(this.workshops.idWorkshop);
      this.getReservationsForWorkshop(); // Appel de getReservationsForWorkshop() ici
      this.loadReservationCount(this.workshops.idWorkshop);
    },
    (err: any) => {
      console.error('Error retrieving workshop details:', err);
      this.toaster.error("Failed to retrieve workshop details.");
    }
  );
}



    navigateToUpdate(): void {
        // Naviguer vers le chemin de mise à jour
        this.router.navigate(['/update', this.workshops.idWorkshop]);
    }

    onDeleteWorkshop(idWorkshop: number) {
        this.shared.deleteWorkshop(idWorkshop).subscribe(
            res => {
                this.toaster.success("Votre workshop à été supprimé avec succès");
                this.router.navigate(['/DlistW']);

            },
            error => {
                console.error('Error deleting workshop:', error);
                this.toaster.error("Error lors de la suppression de votre workshop");
            }
        );
    }

    getAvailableCapacity(idWorkshop: number) {
        this.shared.getAvailableCapacity(idWorkshop).subscribe(
            capacity => {
                this.workshops.availableCapacity = capacity;
            },
            error => {
                console.error('Error retrieving available capacity:', error);
                this.toaster.error("Failed to retrieve available capacity.");
            }
        );
    }

    loadReservationCount(idWorkshop: number): void {
    this.shared.getReservationCount(idWorkshop).subscribe(
      count => {
        this.reservationCount = count;  // Set this to a component property
        console.log('Reservation count:', count);
      },
      error => {
        console.error('Error fetching reservation count', error)
      }
    );
  }
   onDeleteRes(idReservation: number) {
        this.resService.deleteReservation(idReservation).subscribe(
            res => {
                this.toaster.success("Votre réservation a été annulé avec succès");
                this.getReservationsForWorkshop();
            },
            error => {
                console.error('Error deleting reservation:', error);
                this.toaster.error("Votre réservation ne peux pas être annulée");
            }
        );
    }

    getReservationsForWorkshop() {
  this.resService.getReservationsForWorkshop(this.workshops.idWorkshop).subscribe(
    (reservations: any[]) => {
      console.log(reservations);
      this.reservations = reservations; // Mettre à jour la liste des réservations
    },
    (error) => {
      console.error('Error fetching reservations for workshop:', error);
    }
  );
}

 


}

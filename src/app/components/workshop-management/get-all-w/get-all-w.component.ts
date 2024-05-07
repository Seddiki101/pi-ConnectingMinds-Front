import { Component } from '@angular/core';
import { SharedWService } from '../../../service/workshopmanagement/shared-w.service';
import {Router} from "@angular/router";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {MatDialog} from "@angular/material/dialog";
import {ReservationModalComponent} from "../reservation-modal/reservation-modal.component";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-get-all-w',
  templateUrl: './get-all-w.component.html',
  styleUrls: ['./get-all-w.component.css']
})
export class GetAllWComponent {
    workshops: any[];
    filteredWorkshops: any[];
    availableCapacity: number;
    workshop:any;
    hoursSinceCreation: number;
    minPrice: number ;
    maxPrice: number ;
    p: number = 1;

    constructor(private shared: SharedWService, private router: Router, private sanitizer: DomSanitizer, public dialog: MatDialog, private toaster : ToastrService) { }

    ngOnInit(): void {
        this.getAllWorkshops();
        
    }
   getAllWorkshops() {
        this.shared.getAllworkshops().subscribe(
            (res: any) => {
                console.log(res);
                this.workshops=res;
                this.filteredWorkshops = res;
                this.workshops.forEach(workshop => {
                    this.getAvailableCapacity(workshop);
                });
            },
            (err: any) => {
                console.error('Error fetching workshops:', err);
                this.toaster.error("Error lors du chargement des workshops");
            }
        );
    }

    onDeleteWorkshop(idWorkshop: number) {
        this.shared.deleteWorkshop(idWorkshop).subscribe(
            res => {
                this.toaster.success("Votre workshop à été supprimé avec succès");
                this.getAllWorkshops(); // Recharger la liste après suppression
            },
            error => {
                console.error('Error deleting workshop:', error);
                this.toaster.error("Error lors de la suppression de votre workshop");
            }
        );
    }

    navigateToWorkshop(id: number): void {
        this.router.navigate(['/update', id]);
    }

    openReservationModal(workshopId: number): void {
        console.log("Opening modal for workshop ID:", workshopId);
        const dialogRef = this.dialog.open(ReservationModalComponent, {
            width: '300px',
            data: { idWorkshop: workshopId }
        });

        dialogRef.afterClosed().subscribe(result => {
            this.toaster.success("Votre réservation est confirmé");
            console.log('The dialog was closed');
        });
    }

    performSearch(event: Event): void {
        const value = (event.target as HTMLInputElement).value; // Cast and safely access the value
        if (!value) {
            this.filteredWorkshops = this.workshops;
        } else {
            this.filteredWorkshops = this.workshops.filter(workshop =>
                workshop.title.toLowerCase().includes(value.toLowerCase()) ||
                workshop.description.toLowerCase().includes(value.toLowerCase())
            );
        }
    }

    getAvailableCapacity(workshop: any) {
        this.shared.getAvailableCapacity(workshop.idWorkshop).subscribe(
            capacity => {
                workshop.availableCapacity = capacity; // Update the capacity directly in the workshop object
            },
            error => {
                console.error('Error retrieving available capacity:', error);
            }
        );
    }


    fetchHoursSinceCreation(workshop: any): void {
    this.shared.getHoursSinceCreation(workshop.idWorkshop).subscribe(
      (hours: number) => {
        this.hoursSinceCreation = hours;
      },
      error => {
        console.error('Error fetching hours since creation', error);
      }
    );
  }

  filterByPrice(): void {
    this.filteredWorkshops = this.workshops.filter(workshop =>
      workshop.prix >= this.minPrice && workshop.prix <= this.maxPrice
    );
}



}

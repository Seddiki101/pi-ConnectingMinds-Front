import { Component } from '@angular/core';
import {SharedWService} from "../../../service/workshopmanagement/shared-w.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ReservationModalComponent} from "../reservation-modal/reservation-modal.component";
import {DomSanitizer} from "@angular/platform-browser";
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import { userLogin } from 'src/app/service/usermanagement/requestTypes/userLogin';
import { AuthenticService } from 'src/app/service/usermanagement/guard/authentic.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-get-by-id-workshop',
  templateUrl: './get-by-id-workshop.component.html',
  styleUrls: ['./get-by-id-workshop.component.css']
})
export class GetByIdWorkshopComponent {
  workshops: any;
  id: any;
  availableCapacity: number;
  currentuser : number = 0  ;
  userIdSubscription: Subscription;
  
  
  constructor(private act: ActivatedRoute,private shared: SharedWService, private sanitizer: DomSanitizer, public dialog: MatDialog, private toaster: ToastrService, private router: Router,  private authsvc: AuthenticService) {
  }

  ngOnInit(): void {

    this.userIdSubscription = this.authsvc.getId().subscribe(userId => {
            this.currentuser = userId;
             this.getWorkshopById();  
        });

  }

  ngOnDestroy(): void {
        this.userIdSubscription.unsubscribe();
    }

  getWorkshopById() {
      this.id=this.act.snapshot.paramMap.get('id');
    this.shared.getWorkshopById(this.id).subscribe(
        (res: any) => {
          console.log(res);
          this.workshops=res;
          this.getAvailableCapacity(this.workshops.idWorkshop);
        },
        (err: any) => {
            console.error('Error retrieving workshop details:', err);
            this.toaster.error("Failed to retrieve workshop details.");
        }
    );
  }

    openReservationModal(workshopId: number): void {
        console.log("Opening modal for workshop ID:", workshopId);
        const dialogRef = this.dialog.open(ReservationModalComponent, {
            width: '300px',
            data: { idWorkshop: workshopId }
        });

        dialogRef.afterClosed().subscribe(result => {
            this.toaster.success("Réservation confirmée")
            console.log('The dialog was closed');
        });
    }

    navigateToUpdate(): void {
        // Naviguer vers le chemin de mise à jour
        this.router.navigate(['/update', this.workshops.idWorkshop]);
    }

    onDeleteWorkshop(idWorkshop: number) {
        this.shared.deleteWorkshop(idWorkshop).subscribe(
            res => {
                this.toaster.success("Votre workshop à été supprimé avec succès");
                this.router.navigate(['/list']);

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

 

}

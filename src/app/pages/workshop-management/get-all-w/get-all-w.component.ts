import { Component } from '@angular/core';
import { SharedWService } from '../../../service/workshopmanagement/shared-w.service';
import {Router} from "@angular/router";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {MatDialog} from "@angular/material/dialog";
import {ReservationModalComponent} from "../reservation-modal/reservation-modal.component";

@Component({
  selector: 'app-get-all-w',
  templateUrl: './get-all-w.component.html',
  styleUrls: ['./get-all-w.component.css']
})
export class GetAllWComponent {
    workshops: any[];
    constructor(private shared: SharedWService, private router: Router, private sanitizer: DomSanitizer, public dialog: MatDialog) { }

    ngOnInit(): void {
        this.getAllWorkshops();
    }
   getAllWorkshops() {
        this.shared.getAllworkshops().subscribe(
            (res: any) => {
                console.log(res);
                this.workshops=res;
            },
            (err: any) => {
                console.error(err);
            }
        );
    }

    onDeleteWorkshop(idWorkshop: number) {
        this.shared.deleteWorkshop(idWorkshop).subscribe(
            res => {
                alert('Workshop deleted successfully!');
                this.getAllWorkshops(); // Recharger la liste après suppression
            },
            error => {
                console.error('Error deleting workshop:', error);
                alert('Failed to delete workshop.');
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
            console.log('The dialog was closed');
        });
    }


}

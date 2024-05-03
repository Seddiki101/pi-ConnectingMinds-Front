import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ResServiceService} from "../../../service/workshopmanagement/res-service.service";
interface DialogData {
  idWorkshop: number;
}
@Component({
  selector: 'app-reservation-modal',
  templateUrl: './reservation-modal.component.html',
  styleUrls: ['./reservation-modal.component.css']
})

export class ReservationModalComponent {

  id : any;
  nomParticipant: string;
  prenomParticipant: string;

  constructor(public dialogRef: MatDialogRef<ReservationModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private resService: ResServiceService) {
  }

  onReserve(): void {
    const reservation = {
      nomParticipant: this.nomParticipant,
      prenomParticipant: this.prenomParticipant
    };
    if (this.data.idWorkshop) {
      this.resService.ajouterReservation(reservation, this.data.idWorkshop).subscribe({
        next: (response) => {
          console.log('Réservation réussie', response);
          this.dialogRef.close();
        },
        error: (err) => {
          console.error('Erreur lors de la réservation', err);
        }
      });
    } else {
      console.error('ID Workshop is undefined');
    }
  }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResServiceService } from 'src/app/service/workshopmanagement/res-service.service';

@Component({
  selector: 'app-dlist-reservation',
  templateUrl: './dlist-reservation.component.html',
  styleUrls: ['./dlist-reservation.component.css']
})
export class DlistReservationComponent {
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

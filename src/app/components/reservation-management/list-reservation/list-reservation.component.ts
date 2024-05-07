import { Component } from '@angular/core';
import {SharedWService} from "../../../service/workshopmanagement/shared-w.service";
import {Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {MatDialog} from "@angular/material/dialog";
import {ResServiceService} from "../../../service/workshopmanagement/res-service.service";
import {ToastrService} from "ngx-toastr";
import { Subscription } from 'rxjs';
import { AuthenticService } from 'src/app/service/usermanagement/authentic/authentic.service';


@Component({
  selector: 'app-list-reservation',
  templateUrl: './list-reservation.component.html',
  styleUrls: ['./list-reservation.component.css']
})
export class ListReservationComponent {
  reservations: any[];
  currentuser: number = 0;
  userIdSubscription: Subscription;

  
  constructor(private resService: ResServiceService, private router: Router, private toaster: ToastrService, private authsvc: AuthenticService) { }

  ngOnInit(): void {
    this.userIdSubscription = this.authsvc.getId().subscribe(userId => {
  console.log("User ID:", userId);  // Pour vérifier que l'ID est correctement récupéré
  this.currentuser = userId;
  this.getAllreservation();
});

  }
    getAllreservation() {
  this.resService.getAllreservation().subscribe(
    (res: any) => {
      console.log("Réservations récupérées:", res);  // Pour voir les données retournées
      this.reservations = res.filter((r: any) => r.user_id === this.currentuser);
    },
    (err: any) => {
      console.error("Erreur lors de la récupération des réservations:", err);
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
        this.toaster.error("Votre réservation ne peut pas être annulée");
      }
    );
  }

  ngOnDestroy() {
    if (this.userIdSubscription) {
      this.userIdSubscription.unsubscribe();  // Nettoyer l'abonnement
    }
  }
}

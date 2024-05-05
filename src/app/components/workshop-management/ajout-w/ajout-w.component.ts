import {Component, OnInit} from '@angular/core';
import { SharedWService } from '../../../service/workshopmanagement/shared-w.service';
import { Router } from '@angular/router';
import {formatDate} from "@angular/common";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-ajout-w',
  templateUrl: './ajout-w.component.html',
  styleUrls: ['./ajout-w.component.css']
})
export class AjoutWComponent implements OnInit{
  image: any;
  workshops = {
    title: '',
    description: '',
    dateDeb: '',
    dateFin: '',
    prix: 0.0,
    maxCapacity: 0,
    localisation: '',
  };

  constructor(public Shared: SharedWService, private router: Router, private toastr: ToastrService) {
  }

  add() {
  const datetimeDeb = new Date(this.workshops.dateDeb).toISOString();
  const datetimeFin = new Date(this.workshops.dateFin).toISOString();
  
  const formData = new FormData();
  formData.append('title', this.workshops.title);
  formData.append('description', this.workshops.description);
  formData.append('dateDeb', datetimeDeb); // Envoyer avec le temps inclus
  formData.append('dateFin', datetimeFin); // Envoyer avec le temps inclus
  formData.append('prix', this.workshops.prix.toString());
  formData.append('maxCapacity', this.workshops.maxCapacity.toString());
  formData.append('localisation', this.workshops.localisation);
  if (this.image) {
    formData.append('file', this.image, this.image.name);
  }
    this.Shared.addWorkshop(formData)
    .subscribe(
      res => {
        this.toastr.success("Votre workshop est ajouté avec succès");
        this.router.navigate(['/list']);
      },
      err => {
        console.error(err);
        this.toastr.error("Erreur lors de l'ajout de workshop");
      }
    );
}

  onSubmit() {
    this.add();
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.image = event.target.files[0];
      console.log(this.image);
    }
  }
  ngOnInit(): void {
  }
}

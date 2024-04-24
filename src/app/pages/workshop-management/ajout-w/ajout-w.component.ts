import {Component, OnInit} from '@angular/core';
import { SharedWService } from '../../../service/workshopmanagement/shared-w.service';
import { Router } from '@angular/router';
import {formatDate} from "@angular/common";


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
    currentCapacity: 0,
    localisation: '',
  };

  constructor(public Shared: SharedWService, private router: Router) {
  }

  add() {
    const formData = new FormData();
    formData.append('title', this.workshops.title);
    formData.append('description', this.workshops.description);
    formData.append('dateDeb', this.workshops.dateDeb);
    formData.append('dateFin', this.workshops.dateFin);
    formData.append('prix', this.workshops.prix.toString());
    formData.append('maxCapacity', this.workshops.maxCapacity.toString());
    formData.append('currentCapacity', this.workshops.currentCapacity.toString());
    formData.append('localisation', this.workshops.localisation);
    if (this.image) {
      formData.append('file', this.image, this.image.name);
    }

    this.Shared.addWorkshop(formData)
        .subscribe(
            res => {
              const formattedDeb = formatDate(this.workshops.dateDeb, 'yyyy-MM-dd', 'en-US');
              const formattedFin = formatDate(this.workshops.dateFin, 'yyyy-MM-dd', 'en-US');
              this.workshops = {
                title: '',
                description: '',
                dateDeb: formattedDeb,
                dateFin: formattedFin,
                prix: 0.0,
                maxCapacity: 0,
                currentCapacity: 0,
                localisation: ''
              };
              this.router.navigate(['/list']);
            },
            err => {
              console.log(err);
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

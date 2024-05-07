import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SharedService} from "../shared.service";

@Component({
  selector: 'app-update-answer',
  templateUrl: './update-answer.component.html',
  styleUrls: ['./update-answer.component.css']
})
export class UpdateAnswerComponent {
  reponse: any = {
    contenu: '',
   //image: null // Initialiser l'image à null
  };
  id: any;
  constructor(private act: ActivatedRoute, private _shared: SharedService) {}

  ngOnInit(): void {
    this.id = this.act.snapshot.paramMap.get('id');
    this._shared.getAnswerById(this.id).subscribe(
        res => {
          this.reponse = res;
        },
        error => {
          console.log(error);
        }
    );
  }

  UpdateAnswer() {
    const formData = new FormData();
    formData.append('contenu', this.reponse.contenu); // Ajouter le contenu du post
   // formData.append('image', this.post.image); // Ajouter l'image du post

    this._shared.UpdateAnswer(this.id, formData).subscribe(
        res => {
          console.log(res);
        },
        error => {
          console.error(error);
        }
    );
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0]; // Récupérer le fichier sélectionné

    if (file) {
      // Mettre à jour la propriété post.image avec le fichier sélectionné
      this.reponse.image = file;
    }
  }

}

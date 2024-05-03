import { Component } from '@angular/core';
import {Reponse} from "../reponse";
import {SharedService} from "../shared.service";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-add-answer',
  templateUrl: './add-answer.component.html',
  styleUrls: ['./add-answer.component.css']
})
export class AddAnswerComponent {
  reponses: Reponse[] = [];
  idQuestion: number;
  reponse: any = {
    idReponse: 0,
    contenu: '',
    createdAt: new Date(),
    firstName: '',
    lastName: '',
    updatedAt: new Date(),
    // questionId: 0,
  };
  constructor(public _shared: SharedService,  private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.idQuestion = params['id']; // Extracting idQuestion from route parameters
    });
  }
  addResponses() {
    this._shared.addResponse(this.idQuestion, this.reponse.contenu)
        .subscribe(
            (res: Reponse) => {
              // Ajouter la nouvelle réponse à la liste
              this.reponses.push(res);
              // Réinitialiser les champs
              this.reponse.contenu = '';
              //this.newReponseImage = null;
            },
            error => {
              console.error('Error adding response:', error);
              // Afficher un message d'erreur convivial pour l'utilisateur
            }
        );
  }
  onSubmit() {
    this.addResponses();
  }

}

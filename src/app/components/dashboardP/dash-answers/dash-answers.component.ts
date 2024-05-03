import { Component } from '@angular/core';
import {Reponse} from "../../forum/reponse";
import {SharedService} from "../../forum/shared.service";
import {ActivatedRoute} from "@angular/router";
import {SharedAService} from "./shared-a.service";

@Component({
  selector: 'app-dash-answers',
  templateUrl: './dash-answers.component.html',
  styleUrls: ['./dash-answers.component.css']
})
export class DashAnswersComponent {
  reponses: Reponse[] = [];
  idQuestion: number;
    fp: any[];
    rep :any;
    reponsess: any[];

  constructor(public _shared: SharedAService,  private route: ActivatedRoute) {}
    ngOnInit(): void {
        // Récupérer l'identifiant de la question depuis l'URL
        // @ts-ignore
        this.idQuestion = +this.route.snapshot.paramMap.get('id');

        //this.route.snapshot.paramMap.get('id');
        // Appeler la méthode du service pour récupérer les réponses de la question
        this._shared.getReponseById(this.idQuestion)
            .subscribe(
                (res: Reponse[]) => {
                    this.reponses = res;
                    this.reponsess = res; // Initialize reponsess here
                },
                error => {
                    console.error('Error fetching answers:', error);
                    // Afficher un message d'erreur convivial pour l'utilisateur
                }
            );
    }


    deleteAnswer(id: number) {
        this._shared.deleteAnswer(id)
            .subscribe(
                () => {
                    console.log('Answer deleted successfully');
                    // Supprimer éventuellement la question supprimée du tableau local des posts
                    this.reponses = this.reponses.filter(reponse => reponse.idReponse !== id);
                },
                error => {
                    console.error('Error deleting reponse:', error);
                    // Afficher un message d'erreur convivial pour l'utilisateur
                }
            );
    }

    performSearch(event: Event): void {
        const value = (event.target as HTMLInputElement).value.trim().toLowerCase(); // Cast and safely access the value
        if (!value) {
            this.reponses = [...this.reponsess]; // Restaurer les publications originales si la valeur de recherche est vide
        } else {
            this.reponses = this.reponsess.filter(rep =>
                rep.contenu.toLowerCase().includes(value)
            );
        }
    }

}

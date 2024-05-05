import { Component } from '@angular/core';
import {SharedService} from "../shared.service";
import {Question} from "../question";
import {Reponse} from "../reponse";
import {ActivatedRoute} from "@angular/router";
import { Subscription } from 'rxjs';
import { AuthenticService } from '../../../service/usermanagement/authentic/authentic.service';
import { TokenService } from 'src/app/service/usermanagement/token-svc/token-service.service';


@Component({
  selector: 'app-list-reponses',
  templateUrl: './list-reponses.component.html',
  styleUrls: ['./list-reponses.component.css']
})
export class ListReponsesComponent {

  reponses: Reponse[] = [];
  idQuestion: number;
    fp: any[];
    rep :any;
    reponsess: any[];
    currentuser : number = 0  ;
    userIdSubscription: Subscription;
    currentUserFirstName: string = '';
    currentUserLastName: string = '';
    

  constructor(public _shared: SharedService,  private route: ActivatedRoute,  private authsvc: AuthenticService, private t: TokenService) {}
    ngOnInit(): void {
        this.userIdSubscription = this.authsvc.getId().subscribe(userId => {
            this.currentuser = userId;
            console.log("id req1 "+userId)  
            this.getReponses();  
        });
        /*
        this.userNameSubscription = this.t.getName.subscribe(firstName => {
            this.currentUserFirstName = firstName;
          });
      
          this.userNameSubscription = this.authsvc.getLastName().subscribe(lastName => {
            this.currentUserLastName = lastName;
          });*/
        
        
    }
    getReponses() {
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
                    alert('Error fetching answers: ' + error);

                    // Afficher un message d'erreur convivial pour l'utilisateur
                }
            );
    }

    deleteAnswer(id: number) {
        this._shared.deleteAnswer(id)
            .subscribe(
                () => {
                    alert('Answer deleted successfully');

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

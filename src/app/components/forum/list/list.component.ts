import { Component } from '@angular/core';
import {Question} from "../question";
import {SharedService} from "../shared.service";
import {Reponse} from "../reponse";
import { AuthenticService } from 'src/app/service/usermanagement/guard/authentic.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
    posts: Question[] = [];
    reponses: Reponse[] = [];
    idQuestion: number;
    fp: any[];
    post :any;
    postss: any[];
    currentuser : number = 0  ;
    userIdSubscription: Subscription;


    constructor(public _shared: SharedService , private authsvc: AuthenticService) {}

    ngOnInit(): void {
        this.userIdSubscription = this.authsvc.getId().subscribe(userId => {
            this.currentuser = userId;
            console.log("id req1 "+userId)  
            this.getQuestions();  
        });

        //this.getQuestions();
    }

    ngOnDestroy(): void {
        this.userIdSubscription.unsubscribe();
    }

    getQuestions() {
        this._shared.getAllPosts()
            .subscribe(
                res => {
                    this.posts = res as Question[];
                    this.postss = [...this.posts]; // Initialize postss with a copy of posts
                    this.posts.sort((a, b) => {
                        const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
                        const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
                        return dateB.getTime() - dateA.getTime();
                    });

                },
                error => {
                    console.error(error);
                }
            );
    }


    delete(id: number) {
        this._shared.deletepost(id)
            .subscribe(
                () => {
                    console.log('Question deleted successfully');
                    // Supprimer éventuellement la question supprimée du tableau local des posts
                    this.posts = this.posts.filter(post => post.idQuestion !== id);
                },
                error => {
                    console.error('Error deleting question:', error);
                    // Afficher un message d'erreur convivial pour l'utilisateur
                }
            );
    }
    contenu: string;
    questions: Question[];

/*
    searchPosts(): void {

        if (this.contenu.trim()) {
            this._shared.searchPosts(this.contenu)
                .subscribe(questions => {
                    this.questions = questions;
                    // Réinitialiser la liste des posts
                    this.posts = [];
                });
        }
    }*/
    performSearch(event: Event): void {
        const value = (event.target as HTMLInputElement).value.trim().toLowerCase(); // Cast and safely access the value
        if (!value) {
            this.posts = [...this.postss]; // Restaurer les publications originales si la valeur de recherche est vide
        } else {
            this.posts = this.postss.filter(post =>
                post.contenu.toLowerCase().includes(value)
            );
        }
    }






}

import { Component } from '@angular/core';
import {Question} from "../../forum/question";
import {Reponse} from "../../forum/reponse";
import {SharedService} from "../../forum/shared.service";
import {SharedDService} from "./shared-d.service";

@Component({
  selector: 'app-dashboard-post',
  templateUrl: './dashboard-post.component.html',
  styleUrls: ['./dashboard-post.component.css']
})
export class DashboardPostComponent {
  posts: Question[] = [];
  reponses: Reponse[] = [];
  idQuestion: number;
  fp: any[];
  post :any;
  postss: any[];


  constructor(public _shared: SharedDService) {}
  ngOnInit(): void {
    this.getQuestions();
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

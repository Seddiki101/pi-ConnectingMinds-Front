import { Component } from '@angular/core';
import { Question } from "../question";
import { SharedService } from "../shared.service";
import { Reponse } from "../reponse";
import { AuthenticService } from '../../../service/usermanagement/authentic/authentic.service';
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
  post: any;
  postss: any[];
  currentuser: number = 0;
  userIdSubscription: Subscription;
  currentPage = 0;
  itemsPerPage = 2; // Nombre de questions par page

  constructor(public _shared: SharedService, private authsvc: AuthenticService) { }

  ngOnInit(): void {
    this.userIdSubscription = this.authsvc.getId().subscribe(userId => {
      this.currentuser = userId;
      console.log("id req1 " + userId);
      this.getQuestions();
    });
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

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  get startIndex(): number {
    return this.currentPage * this.itemsPerPage;
  }

  get endIndex(): number {
    return Math.min((this.currentPage + 1) * this.itemsPerPage, this.posts.length);
  }

  get visibleGroups(): Question[][] {
    const groups: Question[][] = [];
    for (let i = this.startIndex; i < this.endIndex; i += this.itemsPerPage) {
      groups.push(this.posts.slice(i, i + this.itemsPerPage));
    }
    return groups;
  }

  get totalPages(): number {
    return Math.ceil(this.posts.length / this.itemsPerPage);
  }
}

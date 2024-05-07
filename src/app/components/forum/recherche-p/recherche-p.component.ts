import { Component } from '@angular/core';
import {Question} from "../question";
import {SharedService} from "../shared.service";

@Component({
  selector: 'app-recherche-p',
  templateUrl: './recherche-p.component.html',
  styleUrls: ['./recherche-p.component.css']
})
export class RecherchePComponent {
  contenu: string;
  questions: Question[];

  constructor(private questionService: SharedService) { }

  searchPosts(): void {
    if (this.contenu.trim()) {
      this.questionService.searchPosts(this.contenu)
          .subscribe(questions => this.questions = questions);
    }
  }

}

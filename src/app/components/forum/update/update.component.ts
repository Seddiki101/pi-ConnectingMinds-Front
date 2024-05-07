import { Component } from '@angular/core';
import {Question} from "../question";
import {ActivatedRoute} from "@angular/router";
import {SharedService} from "../shared.service";
//"../shared.service"
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {
    post: any = {
        contenu: '',
        image: null // Initialiser l'image à null
    };
    id: any;

    constructor(private act: ActivatedRoute, private _shared: SharedService) {}

    ngOnInit(): void {
        this.id = this.act.snapshot.paramMap.get('id');
        this._shared.getPostById(this.id).subscribe(
            res => {
                this.post = res;
            },
            error => {
                console.log(error);
            }
        );
    }

    UpdateQuestion() {
        const formData = new FormData();
        formData.append('contenu', this.post.contenu); // Ajouter le contenu du post
        formData.append('image', this.post.image); // Ajouter l'image du post

        this._shared.UpdateQuestion(this.id, formData).subscribe(
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
            this.post.image = file;
        }
    }




}

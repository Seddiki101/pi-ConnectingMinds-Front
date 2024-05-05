import { Component } from '@angular/core';
import { SharedService } from "../shared.service";
import { Question } from "../question";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ajout-post',
  templateUrl: './ajout-post.component.html',
  styleUrls: ['./ajout-post.component.css']
})
export class AjoutPostComponent {
  image  : any;
  posts: any[] = [];
  post: any = {
    idQuestion: 0,
    contenu: '',
    image : null as Uint8Array | null,
    createdAt: new Date(),
    firstName: '',
    lastName: '',
    updatedAt: new Date(),
  };

  constructor(public _shared: SharedService , private route: ActivatedRoute , private router: Router) {
    this.route.params.subscribe(params => {
      this.post.idUser = params['id']; // Extracting idUser from route parameters
    });
  }
  selectimage(e :any){
    this.image = e.target.files[0];
    console.log(this.image);

}

  AjouterQuestion() {

    const formData = new FormData();
    formData.append('contenu', this.post.contenu);

    // Vérifiez d'abord si this.post.image est un Blob
    if (this.post.image instanceof Blob) {
      // Si c'est un Blob, ajoutez-le à FormData avec le nom de clé attendu par votre backend
      formData.append('imageFile', this.post.image, this.post.image.name);

      // Ensuite, envoyez les données avec votre service
      this._shared.CreateNewPost(formData)
          .subscribe(
              res => {
                console.log(res);
                // Réinitialisez le contenu du post après la soumission réussie
                this.post = {
                  idQuestion: 0,
                  contenu: '',
                  image: null
                };
              },
              error => {
                console.log(error);
              }
          );
    } else {
      // Si this.post.image n'est pas un Blob, affichez un message d'erreur ou effectuez une autre action appropriée
      console.error('L\'image sélectionnée n\'est pas valide.');
    }
    this.router.navigate(['/listP']);
  }



  onSubmit() {
    this.AjouterQuestion();
  }
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file instanceof Blob) {
        this.post.image = file;
      } else {
        console.error('Le fichier sélectionné n\'est pas valide.');
      }
    }
  }


}

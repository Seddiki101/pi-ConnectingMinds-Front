import {Reponse} from "./reponse";

export class Question {
    idQuestion:number;
    idUser:number;
    like: number;
    contenu: string;
    image: Uint8Array;
    createdAt?: Date // Optional property for creation date
    firstName?: string;
    lastName?: string;
    updatedAt?: Date;
    imageUrl?: string;
    reponses?: Reponse[];
}

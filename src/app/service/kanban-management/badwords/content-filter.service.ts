import { Injectable } from "@angular/core";
import BadWordsFilter from "bad-words";

@Injectable({
  providedIn: "root",
})
export class ContentFilterService {
  private filter: any;
  constructor() {
    this.filter = new BadWordsFilter();
  }
  containsInappropriateWords(message: string): boolean {
    return this.filter.isProfane(message);
  }
}

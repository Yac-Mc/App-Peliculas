import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent{

  loading: boolean;

  constructor() { }
  searchMovie(termino: string) {
    this.loading = true;
  }

}

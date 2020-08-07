import { Component, Input } from '@angular/core';
import { Movie } from 'src/app/interfaces/movie.interface';

@Component({
  selector: 'app-moviecard',
  templateUrl: './moviecard.component.html',
  styles: [
  ]
})
export class MoviecardComponent {

  @Input() cardMovie: Movie;
  @Input() date?: Date;

  constructor() {
  }

  goDetail(movie: Movie){
  }

}

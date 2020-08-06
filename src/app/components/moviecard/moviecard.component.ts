import { Component, OnInit, Input } from '@angular/core';
import { Movie } from 'src/app/interfaces/movie.interface';

@Component({
  selector: 'app-moviecard',
  templateUrl: './moviecard.component.html',
  styles: [
  ]
})
export class MoviecardComponent implements OnInit {

  @Input() movie: Movie;
  seeMoreMovies: Movie[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  seeMore(movies?: Movie[]){
    this.seeMoreMovies = movies;
  }

  goDetail(movie: Movie){
  }

}

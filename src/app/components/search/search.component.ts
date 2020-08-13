import { Component, Input } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie } from 'src/app/interfaces/movie.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent{

  loading: boolean;
  searchMovies: Movie[] = [];
  termino: string;

  constructor(private moviesService: MoviesService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe( params => {
      this.termino = params[`text`];
      this.searchMovie();
    });
  }

  searchMovie() {
    if (this.termino){
      this.loading = true;
      this.moviesService.searchMovie(this.termino).subscribe((movies: Movie[]) => {
        this.searchMovies = movies;
        this.loading = false;
      });
    }else{
      this.searchMovies = [];
    }
  }

}

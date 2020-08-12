import { Component, AfterViewInit, Input } from '@angular/core';
import { Movie } from 'src/app/interfaces/movie.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-moviecard',
  templateUrl: './moviecard.component.html',
  styles: [
  ]
})
export class MoviecardComponent implements AfterViewInit {

  loading = true;
  @Input() cardMovie: Movie;
  @Input() date?: Date;

  constructor( private router: Router ) {
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.loading = false;
    }, 20);
  }

  goDetail(movie: Movie){
    this.router.navigate(['/detail', movie.id]);
    console.log(movie);
  }

}

import { Component, AfterViewInit, Input } from '@angular/core';
import { Movie } from 'src/app/interfaces/movie.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { __importDefault } from 'tslib';

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
  @Input() origin: string;

  constructor( private router: Router ) { }

  ngAfterViewInit(){
    setTimeout(() => {
      this.loading = false;
    }, 20);
  }

  goDetail(movie: Movie){
    this.router.navigate(['/detail', movie.id, this.origin]);
  }

}

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { MoviesService } from 'src/app/services/movies.service';
import { MovieDetail } from 'src/app/interfaces/movie.interface';
import { NoImagePipe } from 'src/app/pipes/no-image.pipe';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: [
  ]
})
export class DetailComponent {

  movieDetail: MovieDetail;
  urlImageLeading = '';
  urlImageBack = '';
  loading: boolean;
  moreInfo = 'https://www.imdb.com/title/';
  errorMsg = false;
  origin: string;


  constructor( private activatedRoute: ActivatedRoute, private movieService: MoviesService, private config: NgbCarouselConfig,
              private router: Router ) {
    this.loading = true;
    this.config.interval = 10000;
    this.activatedRoute.params.subscribe( params => {
      this.movieService.getDetailMovieById( params[`id`] ).subscribe((detail: MovieDetail) => {
        this.origin = params[`origin`];
        const pipeNoImage = new NoImagePipe();
        this.movieDetail = detail;
        this.urlImageLeading = pipeNoImage.transform(this.movieDetail, true, true);
        this.urlImageBack = pipeNoImage.transform(this.movieDetail, true, false);
        setTimeout(() => this.loading = false, 100);
      }, (err) => {
        console.log(err.error);
        this.errorMsg = true;
      });
    });
  }

  return(){
    if (this.origin === 'home'){
      this.router.navigate(['/home']);
    }
    else {
      this.router.navigate(['/search', this.movieDetail.title]);
    }
  }
}

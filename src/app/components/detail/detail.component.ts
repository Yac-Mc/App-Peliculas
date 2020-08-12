import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
export class DetailComponent implements AfterViewInit {

  movieDetail: MovieDetail;
  urlImageLeading = '';
  urlImageBack = '';
  loading: boolean;

  constructor( private activatedRoute: ActivatedRoute, private movieService: MoviesService, private config: NgbCarouselConfig ) {
    this.loading = true;
    this.config.interval = 10000;
    this.activatedRoute.params.subscribe( params => {
      this.movieService.getDetailMovieId( params[`id`] ).subscribe((detail: MovieDetail) => {
        const pipeNoImage = new NoImagePipe();
        this.movieDetail = detail;
        this.urlImageLeading = pipeNoImage.transform(this.movieDetail, true, true);
        this.urlImageBack = pipeNoImage.transform(this.movieDetail, true, false);
      });
    });
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.loading = false;
    }, 20);
  }

}

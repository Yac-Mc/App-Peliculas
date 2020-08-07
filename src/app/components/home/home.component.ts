import { Component, OnInit } from '@angular/core';

import { MoviesService } from '../../services/movies.service';
import { DatePipe } from '@angular/common';
import { Movie } from '../../interfaces/movie.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  moviesTheatres: Movie[] = [];
  moviesPopulary: Movie[] = [];
  moviesPopularyKids: Movie[] = [];
  seeMoreMovies: Movie[] = [];

  constructor(private movieService: MoviesService, private datePipe: DatePipe) {
  }

  ngOnInit(): void {

    const dates = this.extractDates();
    this.movieService.getInTheatres(dates).subscribe((movies: Movie[]) => this.moviesTheatres = movies);
    this.movieService.getPopulary().subscribe((movies: Movie[]) => this.moviesPopulary = movies);
    this.movieService.getPopularyKids().subscribe((movies: Movie[]) => this.moviesPopularyKids = movies);
  }

  extractDates(): {} {
    const dates: any = {};
    const currentDate = new Date();

    if (currentDate.getDate() === 1){

      dates.dateFin = this.datePipe.transform(currentDate.setDate(0), 'yyyy-MM-dd');
      dates.dateIni = this.datePipe.transform(currentDate.setMonth(currentDate.getMonth() - 1), 'yyyy-MM-dd');
    }else {

      dates.dateIni = `${currentDate.getFullYear().toString()}-${('0' + (currentDate.getMonth() + 1)).slice(-2)}-01`;
      dates.dateFin = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
    }

    return dates;
  }

  seeMore(movies: Movie[]){
    this.seeMoreMovies = movies;
  }

  goDetail(movie: Movie){

    console.log(movie);

  }

  return(){
    this.seeMoreMovies = [];
  }

}

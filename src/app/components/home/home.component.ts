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

  moviesArray = [];
  seeMoreMovies: Movie[] = [];
  seeMoreBtns = false;
  loading: boolean;

  constructor(private movieService: MoviesService, private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.loading = true;
    const dates = this.extractDates();
    this.movieService.getInTheatres(dates).subscribe((inTheatres: Movie[]) => this.moviesArray.push(inTheatres));
    this.movieService.getPopulary().subscribe((populary: Movie[]) => this.moviesArray.push(populary));
    this.movieService.getPopularyKids().subscribe((popularyKids: Movie[]) => {
      this.moviesArray.push(popularyKids);
      this.loading = false;
    });
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

  seeMore(movies: Movie[], type: string){
    const quantityPages = 3;
    this.seeMoreMovies = movies;

    if (type.includes('cartelera')){
      const dates = this.extractDates();
      for (let i = 2; i <= quantityPages; i++){
        // tslint:disable-next-line: max-line-length
        this.movieService.getInTheatres(dates, i).subscribe((inTheatres: Movie[]) => this.seeMoreMovies = this.seeMoreMovies.concat(inTheatres)
        );
      }
    }
    else if ('niños'){
      for (let i = 2; i <= quantityPages; i++){
        // tslint:disable-next-line: max-line-length
        this.movieService.getPopularyKids(i).subscribe((popularyKids: Movie[]) => this.seeMoreMovies = this.seeMoreMovies.concat(popularyKids));
      }
    }
    else if ('populares'){
      for (let i = 2; i <= quantityPages; i++){
        this.movieService.getPopulary(i).subscribe((populary: Movie[]) => this.seeMoreMovies = this.seeMoreMovies.concat(populary));
      }
    }
  }

  return(){
    this.seeMoreMovies = [];
  }

}

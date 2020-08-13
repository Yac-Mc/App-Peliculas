import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Movie, MovieDetail } from '../interfaces/movie.interface';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private url = 'https://api.themoviedb.org/3/';
  private apiKey = 'api_key=252f026891295399e6ba59860c939c85';

  constructor( private http: HttpClient) { }

  private getQuery(query: string, type: string){
    const detail = type === 'detalle' ? true : false;
    if (detail){
      return this.http.get(`${this.url + query + this.apiKey}`)
      .pipe(
        map((data: any) => this.mapFields(type, data, detail)
        )
      );
    }
    else{
      return this.http.get(`${this.url + query + this.apiKey}`)
      .pipe(
        map((data: any) => data.results.map((res: any) => {
          return this.mapFields(type, res, detail);
        }))
      );
    }
  }

  getInTheatres(dates: any = {}, page: number = 1 ){
    return this.getQuery(`discover/movie?primary_release_date.gte=${dates.dateIni}&primary_release_date.lte=${dates.dateFin}&page=${page}&`, 'Películas en cartelera');
  }

  getPopulary(page: number = 1){
    return this.getQuery(`discover/movie?sort_by=popularity.desc&page=${page}&`, 'Películas populares');
  }

  getPopularyKids(page: number = 1){
    return this.getQuery(`discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&page=${page}&`, 'Películas para niños');
  }

  getDetailMovieById(id: number){
    return this.getQuery(`movie/${id}?`, 'detalle');
  }

  searchMovie(texto: string, page: number = 1){
    return this.getQuery(`search/movie?query=${texto}&page=${page}&`, 'busqueda');
  }

  private mapFields(typeMovie: string, response: any, detail: boolean){
    if (detail){
      const movieDetail: MovieDetail = {
        type: typeMovie,
        id: response.id,
        title: response.title,
        vote_average: response.vote_average,
        release_date: response.release_date,
        poster_path: response.poster_path,
        backdrop_path: response.backdrop_path,
        overview: response.overview,
        video: response.video,
        homepage: response.homepage,
        imdb_id: response.imdb_id
      };
      return movieDetail;
    }
    else {
      const movie: Movie = {
        type: typeMovie,
        id: response.id,
        title: response.title,
        vote_average: response.vote_average,
        release_date: response.release_date,
        poster_path: response.poster_path,
        backdrop_path: response.backdrop_path
      };
      return movie;
    }
  }
}

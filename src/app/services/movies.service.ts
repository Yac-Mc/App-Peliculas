import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Movie } from '../interfaces/movie.interface';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private url = 'https://api.themoviedb.org/3/';
  private apiKey = 'api_key=252f026891295399e6ba59860c939c85';

  constructor( private http: HttpClient) { }

  getInTheatres(dates: any = {} ){
    return this.http.get(`${this.url}discover/movie?primary_release_date.gte=${dates.dateIni}&primary_release_date.lte=${dates.dateFin}&${this.apiKey}`)
                    .pipe(
                      map( (data: any) => data.results.map((res: any) => {
                        return this.mapFields('Películas en cartelera', res);
                        // const movie: Movie = {
                        //   type: 'Películas en cartelera',
                        //   id: res.id,
                        //   title: res.title,
                        //   popularity: res.popularity,
                        //   release_date: res.release_date,
                        //   poster_path: res.poster_path,
                        //   backdrop_path: res.backdrop_path
                        // };
                        // return movie;
                      })
                      )
                    );
  }

  getPopulary(){
    return this.http.get(`${this.url}discover/movie?sort_by=popularity.desc&${this.apiKey}`)
    .pipe(
      map( (data: any) => data.results.map((res: any) => {
        return this.mapFields('Películas Populares', res);
      })
      )
    );
  }

  private mapFields(typeMovie: string, response: any){
    const movie: Movie = {
      type: typeMovie,
      id: response.id,
      title: response.title,
      popularity: response.popularity,
      release_date: response.release_date,
      poster_path: response.poster_path,
      backdrop_path: response.backdrop_path
    };
    return movie;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Movie } from '../interfaces/movie.interface';
import { getQueryPredicate } from '@angular/compiler/src/render3/view/util';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private url = 'https://api.themoviedb.org/3/';
  private apiKey = '&api_key=252f026891295399e6ba59860c939c85';

  constructor( private http: HttpClient) { }

  private getQuery(query: string, type: string){
    return this.http.get(`${this.url + query + this.apiKey}`)
                    .pipe(
                      map((data: any) => data.results.map((res: any) => {
                        return this.mapFields(type, res);
                      }))
                    );
  }

  getInTheatres(dates: any = {} ){
    return this.getQuery(`discover/movie?primary_release_date.gte=${dates.dateIni}&primary_release_date.lte=${dates.dateFin}`, 'Películas en cartelera');
  }

  getPopulary(){
    return this.getQuery('discover/movie?sort_by=popularity.desc', 'Películas Populares');
  }

  getPopularyKids(){
    return this.getQuery('discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc', 'Películas para niños');
  }

  private mapFields(typeMovie: string, response: any){
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

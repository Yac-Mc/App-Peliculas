import { Pipe, PipeTransform } from '@angular/core';
import { Movie } from '../interfaces/movie.interface';

@Pipe({
  name: 'noImage'
})
export class NoImagePipe implements PipeTransform {

  transform(movie: Movie): string {

    const urlImage = 'http://image.tmdb.org/t/p/w200';

    const pathNoImage = 'assets/img/noimage.png';
    if (!movie.poster_path){
      return pathNoImage;
    }

    if (movie.poster_path.length > 0){
      return urlImage + movie.poster_path;
    }else if (movie.backdrop_path.length > 0){
      return urlImage + movie.backdrop_path;
    }else {
      return pathNoImage;
    }
  }

}

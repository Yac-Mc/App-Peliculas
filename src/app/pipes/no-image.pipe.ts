import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noImage'
})
export class NoImagePipe implements PipeTransform {

  transform(movie: any, detail: boolean = false, leading: boolean = false): string {

    const pathNoImage = 'assets/img/noimage.png';
    if (!movie){
      return pathNoImage;
    }

    let urlImage = '';
    let pathImage = '';

    if (detail){
      if (leading){
        urlImage = 'http://image.tmdb.org/t/p/w300';
        pathImage = movie.poster_path && movie.poster_path.length > 0 ? urlImage + movie.poster_path : pathNoImage;
      } else{
        urlImage = 'http://image.tmdb.org/t/p/w500';
        pathImage = movie.backdrop_path && movie.backdrop_path.length > 0 ? urlImage + movie.backdrop_path : pathNoImage;
      }
    }
    else{
      urlImage = 'http://image.tmdb.org/t/p/w200';
      if (movie.poster_path && movie.poster_path.length > 0){
        pathImage = urlImage + movie.poster_path;
      }else if (movie.backdrop_path && movie.backdrop_path.length > 0){
        pathImage = urlImage + movie.backdrop_path;
      }else {
        pathImage = pathNoImage;
      }
    }

    return pathImage;
  }

}

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

    const urlImage = detail ? 'http://image.tmdb.org/t/p/w400' : 'http://image.tmdb.org/t/p/w200';
    let pathImage = '';

    if (detail){
      if (leading){
        pathImage = movie.poster_path.length > 0 ? urlImage + movie.poster_path : pathNoImage;
      } else{
        pathImage = movie.backdrop_path && movie.backdrop_path.length > 0 ? urlImage + movie.backdrop_path : pathNoImage;
      }
    }
    else{
      if (movie.poster_path.length > 0){
        pathImage = urlImage + movie.poster_path;
      }else if (movie.backdrop_path.length > 0){
        pathImage = urlImage + movie.backdrop_path;
      }else {
        pathImage = pathNoImage;
      }
    }

    return pathImage;
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CarteleraResponse } from '../interfaces/cartelera-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  constructor( private http: HttpClient ) { }

  getCartelera(): Observable<CarteleraResponse> {

    return  this.http.get<CarteleraResponse>('https://api.themoviedb.org/3/movie/now_playing?api_key=24c2db37893efb5046ff58625707fd0e&language=es-ES&page=1');

  }


}

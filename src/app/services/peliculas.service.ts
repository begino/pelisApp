import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';


import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl: string = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;
  public cargando: boolean = false;

  constructor( private http: HttpClient ) { }

  get params() {
    return {
      api_key: '24c2db37893efb5046ff58625707fd0e',
      language: 'es-ES',
      page: this.carteleraPage.toString()
    }
  }

  getCartelera( pagina: number = 1 ): Observable<Movie[]> {

    if ( this.cargando ) {
      return of([]);
    }

    this.cargando = true;

    return  this.http.get<CarteleraResponse>(`${ this.baseUrl }/movie/now_playing`, {
      params: this.params
    }).pipe(
      map( (resp) => resp.results ),
      tap( () => {
        this.carteleraPage += 1;
        this.cargando = false;
      } )
    );

  }

  buscarPeliculas( texto: string ): Observable<Movie[]> {

    const params = { ...this.params, page: '1', query: texto, include_adult: 'true' };

    return this.http.get<CarteleraResponse>(`${ this.baseUrl }/search/movie`, {
      params: params
    }).pipe(
      map( resp => resp.results )
    );

  }

}

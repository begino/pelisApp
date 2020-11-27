import { Component, HostListener, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public peliculas: Movie[] = [];
  public peliculasSlideshow: Movie[] = [];

  @HostListener('window:scroll', ['$event'])
  onScroll() {

    const pos = ( document.documentElement.scrollTop || document.body.scrollTop ) + 1200;
    const max = ( document.documentElement.scrollHeight || document.body.scrollHeight );

    if ( pos > max ) {
      if ( this.peliculasService.cargando ) {
        return;
      }
      this.peliculasService.getCartelera().subscribe( peliculas => {

        this.peliculas.push(...peliculas);

      });
    }
  }

  constructor( private peliculasService: PeliculasService ) { }

  ngOnInit(): void {

    this.peliculasService.getCartelera(3)
    .subscribe( peliculas => {

      this.peliculasSlideshow = peliculas;
      this.peliculas = peliculas;
      
    });

  }

}

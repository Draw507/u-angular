import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  loading: boolean;
  error: boolean;
  mensajeError: string;
  nuevasCanciones: any[] = [];

  constructor(private sportify: SpotifyService ) {
    this.loading = true;

    this.sportify.getNewReleases().subscribe((data: any) => {
      this.nuevasCanciones = data;
      this.loading = false;
    }, (errorServicio) => {
      this.loading = false;
      this.error = true;

      this.mensajeError = errorServicio.error.error.message;

      console.log(errorServicio);
    });
  }

  ngOnInit(): void {
  }

}

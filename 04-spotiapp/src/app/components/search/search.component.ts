import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  loading: boolean;
  artistas: any[] = [];

  constructor(private sportify: SpotifyService) { }

  ngOnInit(): void {
  }

  buscar(termino: string) {
    this.loading = true;
    this.sportify.getArtistas(termino).subscribe((data: any) => {
      this.artistas = data;
      this.loading = false;
    });
  }

}

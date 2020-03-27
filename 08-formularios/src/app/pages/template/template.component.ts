import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre: 'David',
    apellido: 'Robinson',
    correo: 'david.robinson@logicstudio.net',
    pais : ''
  };

  paises: any[] = [];

  constructor(private service: PaisService) { }

  ngOnInit(): void {
    this.service.getPaises().subscribe(data => {
      this.paises = data;

      this.paises.unshift({
        nombre : '[ Seleccione País ]',
        codigo: ''
      });

      console.log(this.paises);
    });
  }

  guardar(forma: NgForm) {

    if (forma.invalid) {
      Object.values(forma.controls).forEach(control => {
        control.markAsTouched();
      });

      return;
    }

    console.log('submit disparado');
  }

}

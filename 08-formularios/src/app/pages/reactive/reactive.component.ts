import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;

  constructor(private fb: FormBuilder, private validadores: ValidadoresService) {
    this.crearFormulario();
    this.cargarDataFormulario();
    this.crearListeners();
  }

  ngOnInit(): void {
  }

  get nombreNoValido() {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }

  get pass1NoValido() {
    return this.forma.get('pass1').invalid && this.forma.get('pass1').touched;
  }

  get pass2NoValido() {
    const pass1 = this.forma.get('pass1').value;
    const pass2 = this.forma.get('pass2').value;

    return (pass1 === pass2) ? false :  true;
  }

  get pasatiempos() {
    return this.forma.get('pasatiempos') as FormArray;
  }

  crearFormulario() {
    this.forma = this.fb.group({
      nombre: ['', [ Validators.required, Validators.minLength(5) ] ],
      apellido: ['', Validators.required],
      correo: ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      usuario: ['', , this.validadores.existeUsuario],
      pass1: ['', Validators.required],
      pass2: ['', Validators.required],
      direccion: this.fb.group({
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required]
      }),
      pasatiempos: this.fb.array([
        [], []
      ])
    }, {
      validators: this.validadores.passwordsIguales('pass1', 'pass2')
    });
  }

  crearListeners() {
    this.forma.valueChanges.subscribe( valor => {
      console.log(valor);
    });

    this.forma.statusChanges.subscribe(status => console.log(status));

    this.forma.get('nombre').valueChanges.subscribe( console.log );
  }

  agregarPasatiempo() {
    this.pasatiempos.push(this.fb.control('Nuevo elemento', Validators.required));
  }

  cargarDataFormulario() {
    //this.forma.setValue({
    this.forma.reset({
      nombre: 'Juansito',
      apellido: 'Perez',
      correo: 'a@a.com',
      direccion: {
        distrito: 'Por ahi',
        ciudad: 'Va'
      }
    });
  }

  guardar() {
    console.log(this.forma);
  }

}

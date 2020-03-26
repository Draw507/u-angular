import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuarios.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.auth.logIn(this.usuario)
             .subscribe(data => {
               console.log(data);
             }, (err) => {
               console.log(err.error.error.message);
             });
  }

}

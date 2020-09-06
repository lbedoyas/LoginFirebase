import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { usuarioModel } from '../../models/usuario.model';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  logo: string = "./../../../assets/img/logomac.jpg";

  usuario: usuarioModel;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.usuario = new usuarioModel();


  }

  onSubmit(form: NgForm){
    if (form.invalid) {
      return;
    }
    console.log(this.usuario);
    console.log(form);

    this.auth.newUser(this.usuario).subscribe( resp =>{
      console.log(resp);
    },(err)=>{
      console.log(err.error.error.message);
    });
  }

}

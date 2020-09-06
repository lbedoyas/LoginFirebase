import { AuthService } from './../../services/auth.service';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { usuarioModel } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   logo: string = "./../../../assets/img/logomac.jpg";

   usuario: usuarioModel = new usuarioModel();

  constructor(private auth: AuthService) { }

  ngOnInit(): void {

  }

  login(form: NgForm){
      console.log(form);
      if (form.invalid) {
        return;
      }

      this.auth.login(this.usuario).subscribe((resp)=>{
        console.log(resp);
      }, (err)=>{
        console.log(err.error.error.message);
      })


  }

}

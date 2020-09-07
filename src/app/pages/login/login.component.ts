import { AuthService } from './../../services/auth.service';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { usuarioModel } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   logo: string = "./../../../assets/img/logomac.jpg";

   usuario: usuarioModel = new usuarioModel();
   recordarme = false;

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {

    if (localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }

  }

  login(form: NgForm){
      console.log(form);
      if (form.invalid) {
        return;
      }

      Swal.fire({
        icon: 'info',
        title: 'Login...',
        text: 'Espere por favor ...',
        allowOutsideClick: false
      });

      Swal.showLoading();



      this.auth.login(this.usuario).subscribe((resp)=>{
        console.log(resp);
        Swal.close();

        if (this.recordarme) {
          localStorage.setItem('email', this.usuario.email);
        }

        this.router.navigateByUrl('/home');
      }, (err)=>{
        console.log(err.error.error.message);
        Swal.fire({
          icon: 'warning',
          title: 'Login - Error...',
          text: 'Error contacte al administrador.... ' + err.error.error.message
        });
      })


  }

}

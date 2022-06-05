import { Component, OnInit } from '@angular/core';
import{FormGroup,FormControl,Validators} from'@angular/forms';
import { from } from 'rxjs';
import { ApiService } from 'src/app/service/api/api.service';
import { Router } from '@angular/router';
import { AlertasService } from 'src/app/service/alertas/alertas.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm= new FormGroup({

    id: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)

  })
  constructor(private api:ApiService,private router: Router,private alerta:AlertasService) { 
  }

  ngOnInit(): void {
  }

  onLogin(form:any){
    this.api.login(form).subscribe(data=>{

      console.log(data)
      if(data.message=="Ingresado correctamente"){
       this.router.navigate(['dashboard-admin']);
       this.alerta.showSucces('Logeado','Correctamente');
      } else {
        if(data.message==""){
          this.alerta.showError('Credenciales incorrectas','Erroneo');

        }
        
      }
    })
  }

}

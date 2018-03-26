import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username?: string;
  public password?: string;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }
 
  login(event){
    event.preventDefault();
    var resul = this.authService.login(this.username, this.password).subscribe(
      (data)=>{
        console.log("Valores: ",this.username,"-",this.password,"-resultado->"+data);
        if (data) {
          this.router.navigate(['/home'])
        } else {
          console.log("Error in login process");
        }
      }
    );
    
  }

}

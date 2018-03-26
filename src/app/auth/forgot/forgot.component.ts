import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  public mail?: string;
  public username? :string;
  public createAdmin?:boolean;

  constructor(private router:Router, private authService: AuthService) { }

  ngOnInit() {
    this.authService.botStatus().subscribe(
      (data)=>{
        console.log("Status bot: "+data.value);
        if (data.value=="NEW") {
          this.createAdmin = true;
        } 
      }
    )
  }

  resetClave(event) {
    event.preventDefault();
    var resul = this.authService.reset(this.username, this.mail).subscribe(
      (data)=>{
        if (data) {
          this.router.navigate(['/auth/'])
        } else {
          console.log("no se encontro usuario para resetear clave.")
        }
      }
    );
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { Subscription } from 'rxjs';
import { RegisterI } from "./registerI"
import { AuthService } from "../auth.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerData?: RegisterI;
  put$: Subscription;

  constructor(private router:Router, private authService: AuthService) { }

  ngOnInit() {
    this.registerData = { code:"admin", mail:null, name:null };
  }

  registerAdmin(event) {
    event.preventDefault();
    console.log("Va a crear con los siguientes datos: ",this.registerData.code,this.registerData.mail, this.registerData.name);
    if (this.registerData.code!=null && this.registerData.mail!=null && this.registerData.name!=null) {
      this.put$ = this.authService.createAdminUser(
        this.registerData.code, this.registerData.mail, this.registerData.name).finally(() => {})
        .subscribe((resul:any)=>{
          this.router.navigate(['/auth']);
        });
    }
  }
  
  ngOnDestroy() {
    if (this.put$) {
      this.put$.unsubscribe();
    }
  }

}

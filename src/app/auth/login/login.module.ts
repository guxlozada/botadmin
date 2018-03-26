import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { LoginRoutingModule } from './login.routing';
import { LoginComponent } from './login.component';
import { AuthService } from '../auth.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule
  ],
  providers: [AuthService],
  declarations: [LoginComponent]
}) 
export class LoginModule { }
 
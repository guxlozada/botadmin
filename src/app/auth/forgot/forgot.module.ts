import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { ForgotRoutingModule } from './forgot.routing';
import { ForgotComponent } from './forgot.component';
import { AuthService } from '../auth.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ForgotRoutingModule
  ],
  providers: [AuthService],
  declarations: [ForgotComponent]
})
export class ForgotModule { } 
 
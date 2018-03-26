import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { FormsModule }   from '@angular/forms';
import { RegisterRoutingModule } from './register.routing';
import { AuthService } from '../auth.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RegisterRoutingModule
  ],
  declarations: [RegisterComponent],
  providers: [AuthService]
})
export class RegisterModule { }

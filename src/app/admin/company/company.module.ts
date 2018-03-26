import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './company.component';
import { FormsModule } from '@angular/forms';
import { SmartadminModule } from '../../shared/smartadmin.module'
import { CompanyRoutingModule } from './company.routing';
import { CompanyService } from '../services/company.service';

import { ButtonModule } from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';
import { PasswordModule } from 'primeng/primeng';
import { MessagesModule } from 'primeng/primeng';
import { PanelModule } from 'primeng/primeng';
import { FieldsetModule } from 'primeng/primeng';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SmartadminModule, 
    ButtonModule,
    InputTextModule,
    MessagesModule,
    PanelModule,
    FieldsetModule,
    ConfirmDialogModule,
    CompanyRoutingModule
  ],
  providers: [CompanyService, ConfirmationService],
  declarations: [CompanyComponent]
})
export class CompanyModule { }

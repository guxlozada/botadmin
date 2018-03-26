import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SmartadminModule } from '../../shared/smartadmin.module'
import { ButtonModule } from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';
import { InputTextareaModule } from 'primeng/primeng';
import { DataTableModule } from 'primeng/primeng';
import { DialogModule } from 'primeng/primeng';
import { MessagesModule } from 'primeng/primeng';
import { PanelModule } from 'primeng/primeng';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';

import { UsersRoutingModule } from './users.routing';
import { UsersService } from '../services/users.service';
import { UsersComponent } from './users.component';

@NgModule({
  imports: [ 
    CommonModule,
    FormsModule,
    SmartadminModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule, 
    DataTableModule,
    DialogModule,
    MessagesModule,
    PanelModule,
    ConfirmDialogModule,
    UsersRoutingModule
  ],
  providers: [UsersService, ConfirmationService],
  declarations: [UsersComponent]
})
export class UsersModule { }
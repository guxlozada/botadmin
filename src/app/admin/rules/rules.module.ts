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

import { RulesRoutingModule } from './rules.routing';
import { RulesService } from '../services/rules.service';
import { RulesComponent } from './rules.component';

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
    RulesRoutingModule
  ],
  providers: [RulesService, ConfirmationService],
  declarations: [RulesComponent]
})
export class RulesModule { }

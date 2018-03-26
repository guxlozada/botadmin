import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SmartadminModule } from '../../shared/smartadmin.module'
import { RuleComponent } from './rule.component';
import { RuleRoutingModule } from './rule.routing';
import { RulesService } from '../services/rules.service';

import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { DialogModule } from 'primeng/components/dialog/dialog';
import { MessagesModule } from 'primeng/components/messages/messages';
import { PanelModule } from 'primeng/components/panel/panel';
import { DetailRuleComponent } from './detail-rule/detail-rule.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RuleRoutingModule,
    SmartadminModule,
    ButtonModule,
    InputTextModule,
    DataTableModule,
    DialogModule,
    MessagesModule,
    PanelModule
  ],
  providers: [RulesService],
  declarations: [RuleComponent, DetailRuleComponent]
})
export class RuleModule { }

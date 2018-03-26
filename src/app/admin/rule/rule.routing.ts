import { Routes, RouterModule } from '@angular/router';
import {RuleComponent} from "./rule.component";
import {DetailRuleComponent} from "./detail-rule/detail-rule.component";
import {ModuleWithProviders} from "@angular/core";

export const rulesRoutes: Routes = [
    {
        path: 'rule',
        component: RuleComponent,
        data: {
            pageTitle: 'Administración de Reglas Prime'
        },
        
    }
];

export const RuleRoutingModule: ModuleWithProviders = RouterModule.forChild(rulesRoutes);
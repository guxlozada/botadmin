import { Routes, RouterModule } from '@angular/router';
import { RulesComponent } from "./rules.component";
import { ModuleWithProviders } from "@angular/core";

export const rulesRoutes: Routes = [
    {
        path: '',
        component: RulesComponent,
        data: {
            pageTitle: 'Administración de Reglas'
        }
    }
];

export const RulesRoutingModule: ModuleWithProviders = RouterModule.forChild(rulesRoutes);
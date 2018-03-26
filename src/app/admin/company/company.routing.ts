import { Routes, RouterModule } from '@angular/router';
import { CompanyComponent } from "./company.component";

import { ModuleWithProviders } from "@angular/core";

export const companyRoutes: Routes = [
    {
        path: '',
        component: CompanyComponent,
        data: {
            pageTitle: 'Administración de Datos de Empresa'
        },

    }
];

export const CompanyRoutingModule: ModuleWithProviders = RouterModule.forChild(companyRoutes);
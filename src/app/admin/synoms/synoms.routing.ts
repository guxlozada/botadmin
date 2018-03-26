import { Routes, RouterModule } from '@angular/router';
import { SynomsComponent } from "./synoms.component";

import { ModuleWithProviders } from "@angular/core";

export const synomsRoutes: Routes = [
    {
        path: '',
        component: SynomsComponent,
        data: {
            pageTitle: 'Administración de Sinónimos'
        },

    }
];

export const SynomsRoutingModule: ModuleWithProviders = RouterModule.forChild(synomsRoutes);
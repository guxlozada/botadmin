import { Routes, RouterModule } from '@angular/router';
import {DatasetsComponent} from "./datasets.component";

import {ModuleWithProviders} from "@angular/core";

export const datasetsRoutes: Routes = [
    {
        path: '',
        component: DatasetsComponent,
        data: {
            pageTitle: 'Administración de Datos de Entrenamiento'
        },
        
    }
];

export const DatasetsRoutingModule: ModuleWithProviders = RouterModule.forChild(datasetsRoutes);
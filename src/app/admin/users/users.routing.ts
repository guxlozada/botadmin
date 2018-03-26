import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from "./users.component";
import { ModuleWithProviders } from "@angular/core";

export const usersRoutes: Routes = [
    {
        path: '',
        component: UsersComponent,
        data: {
            pageTitle: 'Administración de Usuarios'
        }
    }
];

export const UsersRoutingModule: ModuleWithProviders = RouterModule.forChild(usersRoutes);
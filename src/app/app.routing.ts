/**
 * Created by griga on 7/11/16.
 */


import {Routes, RouterModule} from '@angular/router';
import {MainLayoutComponent} from "./shared/layout/app-layouts/main-layout.component";
import {AuthLayoutComponent} from "./shared/layout/app-layouts/auth-layout.component";
import {ModuleWithProviders} from "@angular/core";

export const routes: Routes = [
    {path: '', redirectTo: 'auth', pathMatch: 'full' },
    {
        path: 'home',
        component: MainLayoutComponent,
        children: [
            
            {
                path: 'home',
                loadChildren: 'app/+home/home.module#HomeModule'
            },
            
        ],
        
    },
    
    {path: 'auth', component: AuthLayoutComponent, loadChildren: 'app/auth/auth.module#AuthModule'},
    {path: 'admin', component: MainLayoutComponent, loadChildren: 'app/admin/admin.module#AdminModule'},
    //{path: '**', redirectTo: 'miscellaneous/error404'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {useHash: true});

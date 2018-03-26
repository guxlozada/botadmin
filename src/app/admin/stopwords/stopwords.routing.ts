import { Routes, RouterModule } from '@angular/router';
import {StopwordsComponent} from "./stopwords.component";

import {ModuleWithProviders} from "@angular/core";

export const stopWordsRoutes: Routes = [
    {
        path: '',
        component: StopwordsComponent,
        data: {
            pageTitle: 'Administración de StopWords'
        },
        
    }
];

export const StopwordsRoutingModule: ModuleWithProviders = RouterModule.forChild(stopWordsRoutes);
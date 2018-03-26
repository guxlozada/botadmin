import {ModuleWithProviders} from "@angular/core"
import {Routes, RouterModule} from "@angular/router";


export const routes:Routes = [
  {
    path: 'rules',
    loadChildren: './rules/rules.module#RulesModule'
  },
  {
    path: 'stopwords',
    loadChildren: './stopwords/stopwords.module#StopwordsModule'
  },
  {
    path: 'synoms',
    loadChildren: './synoms/synoms.module#SynomsModule'
  },
  {
    path: 'datasets',
    loadChildren: './datasets/datasets.module#DatasetsModule'
  },
  {
    path: 'company',
    loadChildren: './company/company.module#CompanyModule'
  },
  {
    path: 'users',
    loadChildren: './users/users.module#UsersModule'
  }
];

export const adminRouting = RouterModule.forChild(routes);
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardContainerComponent} from './features/dashboard-container/dashboard-container.component';

const routes: Routes = [
  {path: '', redirectTo: 'tables', pathMatch: 'full'},
  {
    path: '', component: DashboardContainerComponent, children: [
      {
        path: 'tables', loadChildren: () => import('./features/tables/tables.module').then(t => t.TablesModule),
        data: {
          breadcrumb: 'Tables'
        },
      },
      {
        path: 'cards', loadChildren: () => import('./features/cards/cards.module').then(t => t.CardsModule),
        data: {
          breadcrumb: 'Cards'
        },
      },
      {
        path: 'auth-layout',
        loadChildren: () => import('./features/auth-layouts/auth-layouts.module').then(t => t.AuthLayoutsModule),
        data: {
          breadcrumb: 'Auth layout'
        },
      },
      {
        path: 'dashboard-layout',
        loadChildren: () => import('./features/dashboard-layouts/dashboard-layouts.module').then(t => t.DashboardLayoutsModule),
        data: {
          breadcrumb: 'Dashboard layout'
        },
      },
      {
        path: 'forms',
        loadChildren: () => import('./features/forms/forms.module').then(t => t.FormsModule),
        data: {
          breadcrumb: 'Forms'
        },
      },
      {
        path: 'theming',
        loadChildren: () => import('./features/theming/theming.module').then(t => t.ThemingModule),
        data: {
          breadcrumb: 'Theming'
        },
      }
    ]
  },
  {path: 'auth', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

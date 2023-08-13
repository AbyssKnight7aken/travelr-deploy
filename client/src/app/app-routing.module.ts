import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { MissingComponent } from './views/missing/missing.component';
import { SearchComponent } from './views/search/search.component';
import { AboutComponent } from './views/about/about.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home', },
  { path: 'home', component: HomeComponent, },
  {
    path: 'user',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
},
  {
    path: 'logs',
    loadChildren: () => import('./views/views.module').then(m => m.ViewsModule)
},
{
  path: 'about',
  component: AboutComponent,
},
{
  path: 'search',
  component: SearchComponent,
},
{path: '**',component: MissingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogsComponent } from './logs/logs.component';
import { CreateComponent } from './create/create.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { AuthGuard } from '../guards/auth-activate.guard';

//import { AuthActivate } from '../../core/guards/auth.acivate';

const routes: Routes = [
    {
        path: '',
        //  pathMatch: 'full',
        component: LogsComponent,      
    },
    {
        path: 'create',
        component: CreateComponent,
        canActivate: [AuthGuard],
    },
    {
        path: ':logId',
        component: DetailsComponent,
    },
    {
      path: ':logId/edit',
      component: EditComponent,
      canActivate: [AuthGuard]
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LogsRoutingModule { }


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LogsComponent } from './logs/logs.component';
import { CreateComponent } from './create/create.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { LogsRoutingModule } from './logs-routing.module';
import { SearchComponent } from './search/search.component';
import { MissingComponent } from './missing/missing.component';
import { AboutComponent } from './about/about.component';



@NgModule({
  declarations: [
    HomeComponent,
    LogsComponent,
    CreateComponent,
    DetailsComponent,
    EditComponent,
    SearchComponent,
    MissingComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    LogsRoutingModule
  ]
})
export class ViewsModule { }

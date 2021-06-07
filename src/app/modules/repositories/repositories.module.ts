import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepositoriesRoutingModule } from './repositories-routing.module';
import { RepositoriesComponent } from './repositories.component';


@NgModule({
  declarations: [
    RepositoriesComponent
  ],
  imports: [
    CommonModule,
    RepositoriesRoutingModule
  ]
})
export class RepositoriesModule { }

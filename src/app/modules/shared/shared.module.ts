import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from './services/loader.service';
import { AuthenticationService } from './services/authentication.service';
import { StorageService } from './services/storage.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    LoaderService,
    AuthenticationService,
    StorageService
  ]
})
export class SharedModule { }

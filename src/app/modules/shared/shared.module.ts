import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from './services/loader.service';
import { AuthenticationService } from './services/authentication.service';
import { StorageService } from './services/storage.service';
import { AlertModule } from './components/alert/alert.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AlertModule,
    MatDialogModule
  ],
  providers: [
    LoaderService,
    AuthenticationService,
    StorageService
  ],
  exports:[
    AlertModule
  ]
})
export class SharedModule { }

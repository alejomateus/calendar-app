import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { NgxSpinnerModule } from "ngx-spinner";
import { JwtModule } from '@auth0/angular-jwt';
import { NGFORAGE_CONFIG_PROVIDER } from './ngforage.config';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MenuComponent } from './menu/menu.component';

export function tokenGetter(): string {
  return JSON.parse(
    localStorage.getItem("user"),
  ).token;
}

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    MatMenuModule,
    MatIconModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
      },
    }),
    NgxSpinnerModule
  ],
  providers: [
    NGFORAGE_CONFIG_PROVIDER,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

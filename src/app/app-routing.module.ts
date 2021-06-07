import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiveSessionGuard } from './guards/active-session.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('@home/home.module').then((m) => m.HomeModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'calendar',
    loadChildren: () =>
      import('@calendar/calendar.module').then((m) => m.CalendarModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'sign-up',
    loadChildren: () =>
      import('@sign-up/sign-up.module').then((m) => m.SignUpModule),
    canActivate: [ActiveSessionGuard],
  },
  {
    path: 'sign-in',
    loadChildren: () =>
      import('@sign-in/sign-in.module').then((m) => m.SignInModule),
    canActivate: [ActiveSessionGuard],
  },
  {
    path: 'repositories',
    loadChildren: () =>
      import('@repositories/repositories.module').then((m) => m.RepositoriesModule),
    canActivate: [AuthGuard],
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: "enabled",
      useHash: true,
      scrollPositionRestoration: "enabled",
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

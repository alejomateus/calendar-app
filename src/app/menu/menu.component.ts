import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/modules/shared/services/authentication.service';
import { IMenuItems } from './models/menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  items: IMenuItems[];
  constructor(private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.items = [
      {
        icon: "event",
        text: "Calendario",
        url: "calendar"
      },
      {
        icon: "all_inbox",
        text: "Repositorios",
        url: "repositories"
      }
    ]
  }

  redirect(url: string): void {
    this.router.navigate([`/${url}`]);
  }

  signOut(): void {
    this.authenticationService.signOut();
    this.router.navigate([`/sign-in`]);
  }

}

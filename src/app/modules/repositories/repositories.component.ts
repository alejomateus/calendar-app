import { Component, OnInit } from '@angular/core';
import { IAuthenticatedUser } from '@app/models/authentication';
import { AuthenticationService } from '@shared/services/authentication.service';
import { LoaderService } from '@shared/services/loader.service';
import { IGithubProfile, IRepository } from './models/github';
import { RepositoriesService } from './services/repositories.service';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss']
})
export class RepositoriesComponent implements OnInit {
  repositories: IRepository[];
  profile: IGithubProfile;
  authenticatedUser: IAuthenticatedUser;
  constructor(
    private repositoriesService: RepositoriesService,
    private authenticationService: AuthenticationService,
    private loaderService: LoaderService
  ) { }

  async ngOnInit(): Promise<any> {
    setTimeout(() => {
      this.loaderService.setSpinnerText("Cargando informacion de github...");
    }, 100);
    await this.getProfile();
  }

  private async getRepositories(): Promise<any> {
    try {
      this.repositories = (await this.repositoriesService.getRepositories()).data;
    } catch (error) {
      this.loaderService.hide();
    }
  }

  private async getProfile(): Promise<any> {
    try {
      this.profile = (await this.repositoriesService.getProfile()).data;
      this.authenticatedUser = await this.authenticationService.getCurrentAuthenticatedUser();
      await this.getRepositories();
    } catch (error) {
    } finally {
      this.loaderService.hide();
    }
  }
}

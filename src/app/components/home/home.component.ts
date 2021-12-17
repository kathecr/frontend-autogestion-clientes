import { Component, OnInit } from '@angular/core';
import { TutorialModel } from 'src/app/models/Tutorial.model';
import { TutorialService } from 'src/app/services/tutorial/tutorial.service';
import { TutorialsModel } from 'src/app/models/Tutorials.model';
import { EnterpriseService } from 'src/app/services/enterprise/enterprise.service';
import { ClickModel } from 'src/app/models/Click.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  click: ClickModel = {
    idEmpresa: 0,
    idTutorial: 0,
  };
  rating: number = 3;
  starCount: number = 5;

  tutorials: TutorialModel[] = [];
  currentPage: number = 0;
  totalItems: number = 0;
  totalPages: number = 0;

  constructor(
    private tutorialService: TutorialService,
    private enterpriseService: EnterpriseService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.tutorialService.getTutorials().subscribe((data) => {
      this.tutorials = data.tutoriales;
      this.currentPage = data.currentPage;
      this.totalItems = data.totalItems;
      this.totalPages = data.totalPages;
    });
  }
  sendClick(idTutorial: number): void {
    this.click.idEmpresa = this.enterpriseService.enterprise.idEmpresa;
    this.click.idTutorial = idTutorial;
    this.tutorialService.postClick(this.click).subscribe({
      next: () =>
        this.router.navigateByUrl('/user/tutorial-details/' + idTutorial),
    });
  }
}

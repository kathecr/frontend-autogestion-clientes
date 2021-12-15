import { Component, OnInit } from '@angular/core';
import { TutorialModel } from 'src/app/models/Tutorial.model';
import { TutorialService } from 'src/app/services/tutorial/tutorial.service';
import { TutorialsModel } from 'src/app/models/Tutorials.model';
import { StartRatingComponent } from '../start-rating/start-rating.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  /* tutorials: TutorialsModel = {
    tutoriales: [],
    currentPage: 0,
    totalItems: 0,
    totalPages: 0,
  }; */
  rating:number = 3;
  starCount:number = 5;

  tutorials: TutorialModel[] = [];
  currentPage: number = 0;
  totalItems: number = 0;
  totalPages: number = 0;

  constructor(private tutorialService: TutorialService) {}
  ngOnInit(): void {
    
    this.tutorialService.getTutorials().subscribe((data) => {
      this.tutorials = data.tutoriales;
      this.currentPage = data.currentPage;
      this.totalItems = data.totalItems;
      this.totalPages = data.totalPages;
    });
  }
  onRatingChanged(rating:any){
    console.log(rating);
    this.rating = rating;
  }
}

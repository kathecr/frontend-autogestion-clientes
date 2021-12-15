import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RatingModel } from 'src/app/models/Rating.model';
import { TutorialModel } from 'src/app/models/Tutorial.model';
import { TutorialService } from 'src/app/services/tutorial/tutorial.service';
import { StartRatingComponent } from '../start-rating/start-rating.component';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css'],
})
export class TutorialDetailsComponent implements OnInit {
  id: number = 0;
  @Input() tutorial: TutorialModel = {
    idTutorial: 0,
    titulo: '',
    descripcion: '',
    calificacion: 0,
    numeroCalificaciones: 0,
  };
  /* rating: RatingModel = {
    id: 0,
    calificacion: 0,
    resena: "",
    fechaCalificacion: "",
    idTutorial: 0,
    idEmpresa: 0,
  } */
  ratings: RatingModel[] = [];
  constructor(
    private route: ActivatedRoute,
    private tutorialService: TutorialService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
    });

    this.tutorialService
      .getTutorialById(this.id)
      .subscribe((data) => (this.tutorial = data));

    this.tutorialService
      .getRatingsByIdTutorial(this.id)
      .subscribe((data) => {this.ratings = data
      });
  }
}

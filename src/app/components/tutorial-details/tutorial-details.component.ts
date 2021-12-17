import { Component, Input, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RatingModel, RatingModelPost } from 'src/app/models/Rating.model';
import { TutorialModel } from 'src/app/models/Tutorial.model';
import { TutorialService } from 'src/app/services/tutorial/tutorial.service';
import { EnterpriseService } from 'src/app/services/enterprise/enterprise.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

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
  ratings: RatingModel[] = [];

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private tutorialService: TutorialService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
    });

    this.tutorialService
      .getTutorialById(this.id)
      .subscribe((data) => (this.tutorial = data));
    this.updatedRatings();
  }
  updatedRatings() {
    this.tutorialService.getRatingsByIdTutorial(this.id).subscribe((data) => {
      this.ratings = data;
    });
  }
  openQualifier(): void {
    const dialogRef = this.dialog.open(Qualifier, {
      width: '500px',
      data: this.tutorial.idTutorial,
    });
    dialogRef.afterClosed().subscribe({ next: () => this.updatedRatings() });
  }
}
@Component({
  selector: 'qualifier',
  templateUrl: 'tutorial-qualifier.html',
})
export class Qualifier {
  disabled: boolean = false;
  rating: RatingModelPost = {
    idTutorial: 0,
    idEmpresa: 0,
    calificacion: 0,
    resena: '',
  };
  constructor(
    public dialogRef: MatDialogRef<Qualifier>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private tutorialService: TutorialService,
    private enterpriseService: EnterpriseService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }

  onRatingChanged(rating: number) {
    this.rating.calificacion = rating;
  }
  sendRating(): void {
    if (this.rating.resena != '') {
      this.rating.idTutorial = this.data;
      this.rating.idEmpresa = this.enterpriseService.getEnterprise();
      this.tutorialService.postRating(this.rating).subscribe({
        next: () => {
          this.onNoClick();
        },
      });
    }
  }
}

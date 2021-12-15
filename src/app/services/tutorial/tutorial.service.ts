import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TutorialModel } from 'src/app/models/Tutorial.model';
import { TutorialsModel } from 'src/app/models/Tutorials.model';
import { RatingModel } from 'src/app/models/Rating.model';
@Injectable({
  providedIn: 'root',
})
export class TutorialService {
  uri = `${environment.url}`;
  constructor(private http: HttpClient) {}

  getTutorials(){
    return this.http.get<TutorialsModel>(this.uri+"/tutorial?page=1&size=10")
  }
  getTutorialById(id:number){
    return this.http.get<TutorialModel>(this.uri+"/tutorial/"+id)
  }
  getRatingsByIdTutorial(idTutorial: number){
    return this.http.get<RatingModel[]>(this.uri+"/calificacion/tutorial/"+idTutorial)
  }
}

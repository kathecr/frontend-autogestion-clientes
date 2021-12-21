import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AreaModel } from 'src/app/models/Area.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AreaService {

  uri = `${environment.url}`;
  agent!: AreaModel
  constructor(private http: HttpClient) { }

  getAgentAll() {
    return this.http.get<AreaModel[]>(this.uri + '/area/all');
  }
}

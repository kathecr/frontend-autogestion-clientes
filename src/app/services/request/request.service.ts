import { Injectable } from '@angular/core';
import { RequestModel, CreateRequestModel, UpdateRequestModel } from 'src/app/models/Request.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RequestService {
  uri = `${environment.url}`;
  request!: RequestModel

  constructor(private http: HttpClient) { }

  getRequestAll() {
    return this.http.get<RequestModel[]>(this.uri + '/solicitud/all');
  }

  updateRequest(request: UpdateRequestModel){
    return this.http.patch(this.uri + '/solicitud', request)
  }
  
}

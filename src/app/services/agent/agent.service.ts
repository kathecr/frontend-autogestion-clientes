import { Injectable } from '@angular/core';
import { AgentModel, CreateAgentModel } from 'src/app/models/Agent.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  uri = `${environment.url}`;
  agent!: AgentModel
  constructor(private http: HttpClient) { }

  getAgentAll() {
    return this.http.get<AgentModel[]>(this.uri + '/agente/all');
  }

  updateAgent(request: AgentModel){
    return this.http.patch(this.uri + '/solicitud', request)
  }

  postAgent(agent: CreateAgentModel){
    return this.http.post(this.uri+'/agente', agent)
  }

}

import { AgentModel } from './Agent.model';

export interface RequestModel extends UpdateRequestModel {
  agente: AgentModel;

  nombreArea: string;

  nombreEmpresa: string;

  nitEmpresa: string;
}

export interface CreateRequestModel {
  asunto: string;

  caso: string;

  estado: string;

  fechaGeneracion: string;

  idAgente: number;

  idArea: number;

  idEmpresa: number;
}

export interface UpdateRequestModel extends CreateRequestModel {
  idSolicitud: number;
}

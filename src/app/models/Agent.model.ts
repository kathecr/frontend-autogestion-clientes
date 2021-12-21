export interface CreateAgentModel{
  nombre: string,
  apellido: string,
  correo: string,
  estado: string,
  cedula: string,
  idArea: number,
  nombreArea: string,
}
export interface AgentModel extends CreateAgentModel{
  idAgente: number,
}

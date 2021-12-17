export interface RatingModel {
  id: number;
  calificacion: number;
  resena: string;
  fechaCalificacion: string;
  idTutorial: number;
  idEmpresa: number;
  nombreEmpresa: string;
}
export interface RatingModelPost
  extends Omit<RatingModel, 'id' | 'nombreEmpresa' | 'fechaCalificacion'> {}

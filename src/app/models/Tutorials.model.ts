import { TutorialModel } from 'src/app/models/Tutorial.model';
export interface TutorialsModel{
    tutoriales: TutorialModel[],
    currentPage: number;
    totalItems: number;
    totalPages: number;
}
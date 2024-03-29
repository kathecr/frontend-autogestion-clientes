import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { EnterpriseModel, CreateEnterpriseModel } from 'src/app/models/Enterprise.model';
import { tap } from 'rxjs/operators';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Injectable({
  providedIn: 'root',
})
export class EnterpriseService {
  uri = `${environment.url}`;
  enterprise: EnterpriseModel = {
    idEmpresa: 0,
    nit: '',
    nombre: '',
    celular: '',
    correo: '',
    licencia: '',
    fechaVencimiento: '',
  };

  constructor(private http: HttpClient) {}

  getEnterpriseAll() {
    return this.http.get<EnterpriseModel[]>(this.uri + '/empresa/all');
  }

  getEnterpriseByNit(nit: number) {
    return this.http
      .get<EnterpriseModel>(this.uri + '/empresa/nit/' + nit)
      .pipe(
        tap((data: any) => {
          this.enterprise = data;
          this.saveEnterprise(this.enterprise);
        })
      );
  }

  updateEntreprise(enterprise: EnterpriseModel){
    return this.http.patch(this.uri + '/empresa', enterprise)
  }
  
  postEnterprise(enterprise: CreateEnterpriseModel){
    return this.http.post(this.uri + '/empresa', enterprise)
  }

  saveEnterprise(entreprise: EnterpriseModel) {
    localStorage.setItem('idEmpresa', this.enterprise.idEmpresa.toString());
  }
  getEnterprise(): number {
    return Number(localStorage.getItem('idEmpresa'));
  }
}

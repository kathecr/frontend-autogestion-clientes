import { Component, OnInit } from '@angular/core';
import { CreateRequestModel } from 'src/app/models/Request.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestService } from 'src/app/services/request/request.service';
import { EnterpriseService } from 'src/app/services/enterprise/enterprise.service';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { AreaService } from 'src/app/services/area/area.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-request-user',
  templateUrl: './request-user.component.html',
  styleUrls: ['./request-user.component.css'],
})
export class RequestUserComponent implements OnInit {
  iconRequest = faBriefcase;
  request: CreateRequestModel = {
    asunto: '',
    caso: '',
    idArea: 0,
    idEmpresa: 0,
  };

  form: FormGroup = this.formBuilder.group({
    asunto: ['', [Validators.required]],
    caso: ['', [Validators.required]],
    area: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private requestService: RequestService,
    private enterpriseService: EnterpriseService,
    private areaService: AreaService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  post() {
    const value = this.form.value;

    this.request.asunto = value.asunto;
    this.request.caso = value.caso;
    this.request.idEmpresa = this.enterpriseService.getEnterprise();
    this.areaService.getAgentAll().subscribe((data) => {
      this.areaService.getAgentAll().subscribe((data) => {
        const idArea = data.filter((item) => item.nombre == value.area)[0].idArea;
        this.request.idArea = idArea;
        this.requestService.postRquest(this.request).subscribe(data=>{this.form.reset()
          this.snackBar.open('Solicitud enviada exitosamente', '', {
            duration: 3000
          });});
      });
    });
    
  }
}

import { Component, OnInit } from '@angular/core';
import { CreateRequestModel } from 'src/app/models/Request.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestService } from 'src/app/services/request/request.service';
import { EnterpriseService } from 'src/app/services/enterprise/enterprise.service';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-request-user',
  templateUrl: './request-user.component.html',
  styleUrls: ['./request-user.component.css'],
})
export class RequestUserComponent implements OnInit {
  iconRequest = faBriefcase;
  request: CreateRequestModel = {
    asunto: "",
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
    private enterpriseService: EnterpriseService
  ) {}

  ngOnInit(): void {
    console.log(this.enterpriseService.getEnterprise)
  }
  post(){

    const value= this.form.value;
    this.request.asunto = value.asunto;
    this.request.caso = value.caso;
    console.log(this.enterpriseService.getEnterprise)
    this.requestService.postRquest(this.request);
  }

}

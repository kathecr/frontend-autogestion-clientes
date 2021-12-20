import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  Inject,
} from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  CreateEnterpriseModel,
  EnterpriseModel,
} from 'src/app/models/Enterprise.model';
import { EnterpriseService } from 'src/app/services/enterprise/enterprise.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { faEdit, faBuilding } from '@fortawesome/free-solid-svg-icons';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageEvent!: PageEvent;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  iconEnterprise = faBuilding;
  faEdit = faEdit;
  enterprises: EnterpriseModel[] = [];
  displayedColumns: string[] = [
    'position',
    'nombre',
    'nit',
    'celular',
    'correo',
    'licencia',
    'fechaVencimiento',
    'edit',
  ];

  constructor(
    private enterpriseService: EnterpriseService,

    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.updateEnterpriseTable();
  }

  updateEnterpriseTable() {
    this.enterpriseService.getEnterpriseAll().subscribe((res: any) => {
      this.enterprises = res;
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
    });
  }

  openEdit(enterprise: EnterpriseModel) {
    const dialogRef = this.dialog.open(EditAgent, {
      width: '500px',
      data: enterprise,
    });
  }

  openCreated() {
    const dialogRef = this.dialog.open(CreatedAgent, {
      width: '500px',
    });
    dialogRef
      .afterClosed()
      .subscribe({ next: () => this.updateEnterpriseTable() });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
//------ COMPONENT CREATED ---------//
@Component({
  selector: 'created-agent',
  templateUrl: 'created-agent.html',
})
export class CreatedAgent {
  enterprise: CreateEnterpriseModel = {
    nombre: '',
    clave: '',
    nit: '',
    celular: '',
    correo: '',
    licencia: '',
    fechaVencimiento: '',
  };
  form: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required]],
    nit: ['', [Validators.required]],
    celular: ['', [Validators.required]],
    clave: ['', [Validators.required]],
    correo: ['', [Validators.required]],
    licencia: ['', [Validators.required]],
    fecha: ['', [Validators.required]],
  });

  pattern: string = '(^[0-9]+-{1}[0-9]{1})';

  constructor(
    public dialogRef: MatDialogRef<EditAgent>,
    @Inject(MAT_DIALOG_DATA) public data: EnterpriseModel,
    private formBuilder: FormBuilder,
    private enterpriseService: EnterpriseService
  ) {}

  created() {
    const value = this.form.value;
    this.enterprise.clave = value.clave;
    this.enterprise.nombre = value.nombre;
    this.enterprise.nit = value.nit.replace('-', '');
    this.enterprise.celular = value.celular;
    this.enterprise.correo = value.correo;
    this.enterprise.licencia = value.licencia;
    this.enterprise.clave = value.clave;
    this.enterprise.fechaVencimiento = value.fecha;
    this.enterpriseService.postEnterprise(this.enterprise).subscribe(data=>console.log("Creando empresa"));
    this.dialogRef.close();
  }

  onUsernameChange(e: any) {
    let username = this.form.controls.nit.value;
    username = username.replace(/[a-zA-Z]+/gm, '');
    if (username.length == 10 && Boolean(username[9].match(/[0-9]/g))) {
      username = username.substring(0, 9) + '-' + username[9];
    } else if (username[9] == '-' && username.length < 11) {
      username = username.substring(0, 9);
    } else if (username[9] != '-' && username.length == 11) {
      username = username.substring(0, 9) + '-' + username[9];
    }
    this.form.controls.nit.setValue(username);
  }

}
//------ COMPONENT EDIT ---------//
@Component({
  selector: 'edit-agent',
  templateUrl: 'edit-agent.html',
})
export class EditAgent {
  enterprise: EnterpriseModel = {
    idEmpresa: 0,
    nombre: '',
    nit: '',
    celular: '',
    correo: '',
    licencia: '',
    fechaVencimiento: '',
  };
  form: FormGroup = this.formBuilder.group({
    nombre: [this.data.nombre, [Validators.required]],
    nit: [
      this.data.nit.substring(0, 9) + '-' + this.data.nit[9],
      [Validators.required],
    ],
    celular: [this.data.celular, [Validators.required]],
    correo: [this.data.correo, [Validators.required]],
    licencia: [this.data.licencia, [Validators.required]],
    fecha: [this.data.fechaVencimiento, [Validators.required]],
  });

  pattern: string = '(^[0-9]+-{1}[0-9]{1})';

  constructor(
    public dialogRef: MatDialogRef<EditAgent>,
    @Inject(MAT_DIALOG_DATA) public data: EnterpriseModel,
    private formBuilder: FormBuilder,
    private enterpriseService: EnterpriseService
  ) {}

  ngOnInit(): void {
    this.enterprise = this.data;
  }

  edit() {
    const value = this.form.value;
    this.enterprise.idEmpresa = this.data.idEmpresa;
    this.enterprise.nombre = value.nombre;
    this.enterprise.nit = value.nit.replace('-', '');
    this.enterprise.celular = value.celular;
    this.enterprise.correo = value.correo;
    this.enterprise.licencia = value.licencia;

    this.enterpriseService
      .updateEntreprise(this.enterprise)
      .subscribe({ next: () => {} });

    this.dialogRef.close();
  }

  onUsernameChange(e: any) {
    let username = this.form.controls.nit.value;
    username = username.replace(/[a-zA-Z]+/gm, '');
    if (username.length == 10 && Boolean(username[9].match(/[0-9]/g))) {
      username = username.substring(0, 9) + '-' + username[9];
    } else if (username[9] == '-' && username.length < 11) {
      username = username.substring(0, 9);
    } else if (username[9] != '-' && username.length == 11) {
      username = username.substring(0, 9) + '-' + username[9];
    }
    this.form.controls.nit.setValue(username);
  }
}

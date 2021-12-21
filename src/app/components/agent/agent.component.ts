import { Component, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { faEdit, faUserTie } from '@fortawesome/free-solid-svg-icons';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AgentModel, CreateAgentModel } from 'src/app/models/Agent.model';
import { AgentService } from 'src/app/services/agent/agent.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css'],
})
export class AgentComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageEvent!: PageEvent;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  iconAgent = faUserTie;
  faEdit = faEdit;
  agents: AgentModel[] = [];
  displayedColumns: string[] = [
    'position',
    'nombre',
    'cedula',
    'correo',
    'estado',
    'area',
    'edit',
  ];

  constructor(
    private agentService: AgentService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.updateAgentTable();
  }

  updateAgentTable() {
    this.agentService.getAgentAll().subscribe((res: any) => {
      this.agents = res;
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
    });
  }

  openEdit(agent: AgentModel) {
    const dialogRef = this.dialog.open(EditAgent, {
      width: '500px',
      data: agent,
    });
  }

  openCreated() {
    const dialogRef = this.dialog.open(CreatedAgent, {
      width: '500px',
    });
    dialogRef
      .afterClosed()
      .subscribe({ next: () => this.updateAgentTable() });
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
  agent : CreateAgentModel = {
  nombre: "",
  apellido: "",
  correo: "",
  estado: "",
  cedula: "",
  idArea: 0,
  nombreArea: "",
  }
  form: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    nit: ['', [Validators.required]],
    celular: ['', [Validators.required]],
    clave: ['', [Validators.required]],
    correo: ['', [Validators.required]],
    licencia: ['', [Validators.required]],
    fecha: ['', [Validators.required]],
  });

  constructor(
    public dialogRef: MatDialogRef<EditAgent>,
    @Inject(MAT_DIALOG_DATA) public data: AgentModel,
    private formBuilder: FormBuilder,
    private agentService: AgentService
  ) {}

  created() {
    const value = this.form.value;
    this.agent.nombre = value.clave;
    this.agent.apellido = value.nombre;
    this.agent.correo = value.correo;
    this.agent.cedula = value.celular;
    this.agent.correo = value.correo;
    this.agent.estado = value.estado;
    this.agent.nombreArea = value.area;
    this.agentService
      .postAgent(this.agent)
      .subscribe((data) => console.log('Creando empresa'));
    this.dialogRef.close();
  }
}
//------ COMPONENT EDIT ---------//
@Component({
  selector: 'edit-agent',
  templateUrl: 'edit-agent.html',
})
export class EditAgent {
  agent !: AgentModel
  form: FormGroup = this.formBuilder.group({
    nombre: [this.data.nombre, [Validators.required]],
    apellido: [this.data.apellido, [Validators.required]],
    cedula: [this.data.cedula, [Validators.required]],
    correo: [this.data.correo, [Validators.required]],
    estado: [this.data.estado, [Validators.required]],
    area: [this.data.nombreArea, [Validators.required]],
  });

  constructor(
    public dialogRef: MatDialogRef<EditAgent>,
    @Inject(MAT_DIALOG_DATA) public data: AgentModel,
    private formBuilder: FormBuilder,
    private agentService: AgentService
  ) {}

  ngOnInit(): void {
    this.agent = this.data;
  }

  edit() {
    const value = this.form.value;
    this.agent.nombre = value.nombre;
    this.agent.apellido = value.apellido;
    this.agent.cedula = value.cedula;
    this.agent.correo = value.correo;
    this.agent.estado = value.estado;
    this.agent.nombreArea = value.area;
    this.agentService
      .updateAgent(this.agent)
      .subscribe({ next: () => {} });

    this.dialogRef.close();
  }

}

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
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { faEdit, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { RequestModel, UpdateRequestModel } from 'src/app/models/Request.model';
import { RequestService } from 'src/app/services/request/request.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'],
})
export class RequestComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageEvent!: PageEvent;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  iconRequest = faBriefcase;
  faEdit = faEdit;
  requests: RequestModel[] = [];
  displayedColumns: string[] = [
    'position',
    'empresa',
    'nit',
    'asunto',
    'estado',
    'area',
    'agente',
    'areaAgente',
    'fecha',
    'edit',
  ];

  constructor(
    private requestService: RequestService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.updateEnterpriseTable();
  }

  updateEnterpriseTable() {
    this.requestService.getRequestAll().subscribe((res: any) => {
      this.requests = res;
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
    });
  }

  openEdit(request: RequestModel) {
    const dialogRef = this.dialog.open(EditRequest, {
      width: '500px',
      data: request,
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

//------ COMPONENT EDIT ---------//
@Component({
  selector: 'edit-request',
  templateUrl: 'edit-request.html',
})
export class EditRequest {
  request: UpdateRequestModel = {
    idSolicitud: 0,
    asunto: '',
    caso: '',
    estado: '',
    fechaGeneracion: '2020-01-01',
    idAgente: 0,
    idArea: 0,
    idEmpresa: 0,
  };
  form: FormGroup = this.formBuilder.group({
    estado: [this.data.estado, [Validators.required]],
  });

  constructor(
    public dialogRef: MatDialogRef<EditRequest>,
    @Inject(MAT_DIALOG_DATA) public data: RequestModel,
    private formBuilder: FormBuilder,
    private requestService: RequestService
  ) {}

  ngOnInit(): void {
    this.request.idSolicitud = this.data.idSolicitud;
    
  }

  edit() {
    const value = this.form.value;
    this.request.estado = value.estado;
    console.log(this.request);
    this.requestService
      .updateRequest(this.request)
      .subscribe({ next: () => {} });

    this.dialogRef.close();
  }
}

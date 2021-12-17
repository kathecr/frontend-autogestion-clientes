import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { EnterpriseModel } from 'src/app/models/Enterprise.model';
import { EnterpriseService } from 'src/app/services/enterprise/enterprise.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-enterprise',
  templateUrl: './enterprise.component.html',
  styleUrls: ['./enterprise.component.css'],
})
export class EnterpriseComponent implements AfterViewInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<EnterpriseModel>;
  //dataSource:any;
  enterprises: EnterpriseModel[] = [];
  displayedColumns: string[] = [
    'position',
    'nombre',
    'nit',
    'celular',
    'correo',
    'licencia',
    'fechaVencimiento',
  ];

  constructor(private enterpriseService: EnterpriseService) {}

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.enterpriseService.getEnterpriseAll().subscribe((res) => {
      this.enterprises = res;
      this.dataSource.data = res
      console.log(this.dataSource)
      console.log(res)
    });
    //this.dataSource.paginator = this.paginator;
  }
}

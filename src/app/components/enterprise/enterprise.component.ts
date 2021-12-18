import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { EnterpriseModel } from 'src/app/models/Enterprise.model';
import { EnterpriseService } from 'src/app/services/enterprise/enterprise.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-enterprise',
  templateUrl: './enterprise.component.html',
  styleUrls: ['./enterprise.component.css'],
})
export class EnterpriseComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageEvent!: PageEvent;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
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

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    
    this.enterpriseService.getEnterpriseAll().subscribe((res: any) => {
      this.enterprises = res;
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource.data);
    });
    //this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

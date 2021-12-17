import { Component, OnInit } from '@angular/core';
import { faBuilding, faUserTie, faBriefcase, faChartBar, faBook } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  iconEnterprise = faBuilding;
  iconAgent = faUserTie;
  iconRequest = faBriefcase;
  iconReport = faChartBar;
  iconTutorial = faBook
  constructor() { }

  ngOnInit(): void {
  }

}

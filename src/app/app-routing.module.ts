import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { TutorialDetailsComponent } from './components/tutorial-details/tutorial-details.component';
import { MainLayoutComponent} from './components/main-layout/main-layout.component'
import { EnterpriseComponent } from './components/enterprise/enterprise.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { RequestComponent } from './components/request/request.component';
import { AgentComponent } from './components/agent/agent.component';
import { TutorialAdminComponent } from './components/tutorial-admin/tutorial-admin.component';
const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'user',
    component: MainLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'tutorial-details/:id', component: TutorialDetailsComponent },
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: 'home', component: HomeAdminComponent},
      { path: 'enterprise', component: EnterpriseComponent },
      { path: 'request', component: RequestComponent },
      { path: 'agent', component: AgentComponent },
      { path: 'tutorial', component: TutorialAdminComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

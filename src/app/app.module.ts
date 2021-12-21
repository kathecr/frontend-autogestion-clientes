import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatStepperModule } from '@angular/material/stepper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TokenInterceptor } from './interceptors/token/token.interceptor';
import { HomeComponent } from './components/home/home.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { StartRatingComponent } from './components/start-rating/start-rating.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TutorialDetailsComponent, Qualifier } from './components/tutorial-details/tutorial-details.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { CreatedEnterprise, EditEnterprise, EnterpriseComponent } from './components/enterprise/enterprise.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { EditRequest, RequestComponent } from './components/request/request.component';
import { AgentComponent, CreatedAgent, EditAgent } from './components/agent/agent.component';
import { TutorialAdminComponent } from './components/tutorial-admin/tutorial-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MainLayoutComponent,
    StartRatingComponent,
    TutorialDetailsComponent,
    Qualifier,
    EditEnterprise,
    CreatedEnterprise,
    EditRequest,
    EditAgent,
    CreatedAgent,
    AdminLayoutComponent,
    EnterpriseComponent,
    HomeAdminComponent,
    RequestComponent,
    AgentComponent,
    TutorialAdminComponent
  ],
  entryComponents: [StartRatingComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatDialogModule,
    MatTableModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatMenuModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatStepperModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatSnackBarModule,
    FontAwesomeModule,
    MatSlideToggleModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

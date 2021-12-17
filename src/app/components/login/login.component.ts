import { Component, OnInit, Inject } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert2';
import { AuthService } from '../../services/auth/auth.service';
import { EnterpriseService } from 'src/app/services/enterprise/enterprise.service';
import { EnterpriseModel } from 'src/app/models/Enterprise.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  faBook = faBook;
  admin = false;
  pattern: string = '(^[0-9]+-{1}[0-9]{1})';
  form: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService, //
    public dialog: MatDialog,
    private enterpriseService: EnterpriseService
  ) {
    this.form = this.formBuilder.group({
      nit: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(11),
        ],
      ],
      clave: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  login() {
    const value = this.form.value;
    const usernameOrNit = value.nit.replace('-', '');
    this.authService.login(value.nit.replace('-', ''), value.clave).subscribe({
      error: (error) => {
        console.log(error);
        swal.fire(
          `Inicio fallido ${error.status}`,
          'Verifica la información e intentalo de nuevo',
          'error'
        );
      },
      next: () => {
        if (!this.admin) {
          this.enterpriseService.getEnterpriseByNit(usernameOrNit).subscribe({
            next: () =>
              this.isActive(this.enterpriseService.enterprise.licencia),
          });
        }else{
          this.router.navigate(['/admin/home']);
          this.authService.saveRole('admin')
        }
      },
    });
  }
  
  toggle(): void {
    if (this.admin) {
      this.pattern = '[A-Za-z0-9]+';
    } else {
      this.pattern = '(^[0-9]+-{1}[0-9]{1})';
    }
    this.form.controls.nit.setValue('');
  }

  isActive(statusLicense: string) {
    if (statusLicense == 'activa') {
      this.router.navigate(['/user/home']);
      this.authService.saveRole('enterprise')
    } else if (statusLicense == 'vencida') {
      this.authService.logout();
      this.openDialog();
    }
  }

  onUsernameChange(e: any) {
    let username = this.form.controls.nit.value;
    if (!this.admin) {
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

  openDialog(): void {
    const dialogRef = this.dialog.open(LicenseRenewal, {
      width: '500px',
      data: this.enterpriseService.enterprise,
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
  openDialogBuyLicense(): void {
    const dialogRef = this.dialog.open(LicenseBuy, {
      width: '500px',
    });
  }
}

@Component({
  selector: 'login-dialog',
  templateUrl: 'login-dialog.html',
})
export class LicenseRenewal {
  constructor(
    public dialogRef: MatDialogRef<LicenseRenewal>,
    @Inject(MAT_DIALOG_DATA) public data: EnterpriseModel
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  contact(): void {
    console.log('contactenme');
    this.dialogRef.close();
  }
}

@Component({
  selector: 'license-buy',
  templateUrl: 'license-buy.html',
})
export class LicenseBuy {
  constructor(public dialogRef: MatDialogRef<LicenseBuy>) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  contact(): void {
    console.log('contactenme');
    this.dialogRef.close();
  }
}

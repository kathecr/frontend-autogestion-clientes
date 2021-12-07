import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
//import swal from 'sweetalert2';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService, 
    //  public dialog: MatDialog
  ) {
    this.form = this.formBuilder.group({
      nit: ['', [Validators.required, Validators.minLength(10),Validators.maxLength(11)]],
      clave: ['', [Validators.required]],
    });
  }

  ngOnInit() { }

  login(event: Event) {
    event.preventDefault();
    // (this.form.valid) {
      const value = this.form.value;
      this.authService.login(value.nit, value.clave).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.log(error)
//          swal.fire(
  //        `Inicio fallido ${error.status}`,
    //      'Verifica la información e intentalo de nuevo',
      //      'error'
        //  );
        },
      });
    //}
  }

  openDialog(): void {
    // const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
    //   width: '250px',
    //   data: {}
    // });

    // dialogRef.afterClosed().subscribe(result => {
    // });
  }
}

// @Component({
//   selector: 'login-dialog',
//   templateUrl: 'login-dialog.html',
// })
// export class DialogOverviewExampleDialog {

//   constructor(
//     public dialogRef: MatDialogRef<DialogOverviewExampleDialog>) {}

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

// }
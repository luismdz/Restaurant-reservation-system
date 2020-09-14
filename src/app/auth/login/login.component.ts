import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });

  }

  onSignIn() {

    const { email, password } = this.loginForm.value;

    this.auth.signInWithEmailAndPassword(email, password)
      .then(() => this.router.navigate(['/reservations']));

  }

  onGoogleSignIn() {
    this.auth.googleSignIn()
      .then(() => this.router.navigate(['/reservations']));
  }

}

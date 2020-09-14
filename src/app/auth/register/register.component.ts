import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { ConfirmPasswordValidator } from '../../shared/validators/confirmPassword.validator';

import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/shared/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  user: User;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.registerForm = this.fb.group({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    }, {
      validator: ConfirmPasswordValidator
    })

  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  onSignUp() {
    const { firstName, lastName, email, password } = this.registerForm.value;

    const newUser: User = {
      firstName,
      lastName,
      email,
      password
    };

    this.auth.signUpWithEmailAndPassword(newUser)
      .then(() => this.router.navigateByUrl('/reservations'));
  }

  googleSignIn() {
    this.auth.googleSignIn()
      .then(() => this.router.navigateByUrl('/reservations'));
  }

}

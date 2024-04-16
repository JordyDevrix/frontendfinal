import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  standalone: true,
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {


  public registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {

  }


  ngOnInit(): void {

    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required, Validators.maxLength(64), Validators.minLength(5)]),
      password: new FormControl('', [Validators.minLength(8), Validators.maxLength(128)]),
      repeated_password: new FormControl('', [Validators.minLength(8), Validators.maxLength(128)]),
    });
  }

  public onSubmit(): void {
    if (this.registerForm.value.password !== this.registerForm.value.repeated_password) {
      console.log('Passwords do not match');
      alert('❌ Repeated password does not match ❌');
      this.registerForm.reset();
      return;
    }
    this.authService.register(this.registerForm.value).subscribe((authResponse: { "token": string }) => {
      console.log(authResponse.token, 'User registered');
      alert('User registered ✅');
      this.router.navigate(['/products']);

    })
  }
}

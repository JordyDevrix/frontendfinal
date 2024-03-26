import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';

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

  constructor(private fb: FormBuilder, private authService: AuthService) {

  }


  ngOnInit(): void {

    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required, Validators.maxLength(64), Validators.minLength(5)]),
      password: new FormControl('', [Validators.minLength(8), Validators.maxLength(128)]),
      repeated_password: new FormControl('', [Validators.minLength(8), Validators.maxLength(128)]),
    });
  }

  public onSubmit(): void {
    this.authService.register(this.registerForm.value).subscribe((authResponse: { "token": string }) => {
      console.log(authResponse.token, 'User registered');

    })
  }
}

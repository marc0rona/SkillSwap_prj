import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../services/authservice';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  errorMessage = '';
  successMessage = '';
  suggestedUsername = '';
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      bio: ['', Validators.required],
      skills: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.suggestedUsername = '';

    if (this.registerForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      return;
    }

    const payload = {
      name: this.registerForm.value.name ?? '',
      username: this.registerForm.value.username ?? '',
      email: this.registerForm.value.email ?? '',
      password: this.registerForm.value.password ?? '',
      bio: this.registerForm.value.bio ?? '',
      skills: (this.registerForm.value.skills ?? '')
        .split(',')
        .map((s: string) => s.trim())
        .filter((s: string) => s !== '')
    };

    this.authService.register(payload).subscribe({
      next: () => {
        this.successMessage = 'Inscription réussie';
        this.router.navigate(['/login']);
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = error.error?.error || "Erreur lors de l'inscription";

        if (error.error?.suggested_username) {
          this.suggestedUsername = error.error.suggested_username;
        }
      }
    });
  }

  applySuggestedUsername(): void {
    this.registerForm.patchValue({
      username: this.suggestedUsername
    });
  }
}
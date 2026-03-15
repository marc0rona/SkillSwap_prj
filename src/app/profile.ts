import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAuthService } from '../services/userauth';
import { AuthService } from '../services/authservice';
import { User } from '../models/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {
  user: User | null = null;
  errorMessage = '';
  loading = true;

  constructor(
    private userAuthService: UserAuthService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userAuthService.getMe().subscribe({
      next: (response) => {
        this.user = response;
        this.loading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = error.error?.error || 'Impossible de charger le profil.';
        this.loading = false;
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
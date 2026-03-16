import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobService } from '../../../services/jobservice';
import { CommonModule } from '@angular/common';
import { ErrorHandler } from '../../../utils/errorhandler';

@Component({
  selector: 'app-userreviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './userreviews.html',
  styleUrl: './userreviews.css',
})

export class Userreviews implements OnInit {
  reviews:any[] = [];
  message:string = "";

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService
  ){}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('userId');
    if(!id) return;

    this.jobService.getUserReviews(id).subscribe({
      next:(data:any)=>{
        this.reviews = data;
      },
      error:(err)=>{
        this.message = ErrorHandler.getErrorMessage(err);
      }
    });
  }
}

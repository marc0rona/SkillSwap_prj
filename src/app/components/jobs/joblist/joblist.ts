import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JobService } from '../../../services/jobservice';
import { ErrorHandler } from '../../../utils/errorhandler';

@Component({
  selector: 'app-job-list',
  templateUrl: './joblist.html',
  imports: [RouterModule, CommonModule]
})

export class Joblist implements OnInit {
  jobs:any[] = [];
  message:string = "";

  constructor(private jobService: JobService) {}

  ngOnInit(): void {

    this.jobService.searchJobs({}).subscribe({
      next: (response:any) => {
        this.jobs = response;
      },
      error: (err) => {
        console.error(err);
        this.message = ErrorHandler.getErrorMessage(err);
      }
    });
  }
}

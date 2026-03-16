import { Component, OnInit } from '@angular/core';
import { JobService } from '../../../services/jobservice';
import { CommonModule } from '@angular/common';
import { ErrorHandler } from '../../../utils/errorhandler';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats.html',
  styleUrl: './stats.css',
})

export class Stats {
  stats:any;
  message:string = "";

  constructor(private jobService: JobService){}

  ngOnInit(){
    this.jobService.getPlatformStats().subscribe({

      next:(data)=>{
        this.stats = data;
      },
      error: (err) => {
        this.message = ErrorHandler.getErrorMessage(err);
      }
    });
  }
}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { JobService } from '../../../services/jobservice';
import { ErrorHandler } from '../../../utils/errorhandler';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-createjob',
  imports: [FormsModule,CommonModule],
  templateUrl: './createjob.html',
  styleUrl: './createjob.css',
  standalone: true
})
export class Createjob {
  job = {
    title: '',
    description: '',
    budget: '',
    category: ''
  };

  message = '';

  constructor(private jobService: JobService) {}

  submitJob(){
    this.jobService.createJob(this.job).subscribe({

      next: () => {
        this.message = "Job créé avec succès";
        // reset du formulaire
        this.job = {
          title: '',
          description: '',
          budget: '',
          category: ''
        };
      },
      error: (err) => {
        this.message = ErrorHandler.getErrorMessage(err);
      }
    });
  }
}

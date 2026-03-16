import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { JobService } from '../../../services/jobservice';
import { ErrorHandler } from '../../../utils/errorhandler'; 

@Component({
  selector: 'app-jobdetail',
  standalone: true,
  imports: [CommonModule, FormsModule], //common + forms
  templateUrl: './jobdetail.html',
  styleUrl: './jobdetail.css',
})

export class Jobdetail implements OnInit {

  job: any; //stockage jobs
  proposals: any[] = []; //stockage proposals 
  message: string = ""; //pour msgs d'erreur au-cas ou 

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    // chargement des propositions et jobs
    this.loadJob();
    this.loadProposals();
  }
  
  loadJob( ) {
    const id = this.route.snapshot.paramMap.get('id');
    if(!id) return;
    this.jobService.getJobById(id).subscribe({
      next:(data:any)=>{
        this.job = data;
      },
      error:(err)=>{
         this.message = ErrorHandler.getErrorMessage(err);
      }

    });
  }

  //Section POUR LES PROPOSALS
  //Prepare un prosposal pour le job en cours
  proposal = {
  price: '',
  cover_letter: ''
  };
  //Envoie une proposition pour le job en cours
  submitProposal() {
  const id = this.route.snapshot.paramMap.get('id');
  if(!id) return;

  this.jobService.submitProposal(id, this.proposal).subscribe({
    next:()=>{
      this.message = "Proposition envoyée";
      //vide les champs
      this.proposal = {
          price: '',
          cover_letter: ''
        };
      this.loadProposals();
    },

    error:(err)=>{
      this.message = ErrorHandler.getErrorMessage(err);
    }

  });
}

 //Charger les propositions
loadProposals() {
  const id = this.route.snapshot.paramMap.get('id');
  if(!id) return;

  this.jobService.getProposals(id).subscribe({
    next:(data:any)=>{
      this.proposals = data;
    },
    error:(err)=>{
      this.message = ErrorHandler.getErrorMessage(err);
    }
  });
  }

  acceptProposal(proposalId: number){
  this.jobService.acceptProposal(proposalId).subscribe({

    next:()=>{
      this.message = "Proposition acceptée";
      // recharger les propositions
      this.loadProposals();
      this.loadJob();
    },

    error:(err)=>{
      this.message = ErrorHandler.getErrorMessage(err);
    }
  });
  }

  completeJob() {
  const id = this.route.snapshot.paramMap.get('id');
  if(!id) return;

  this.jobService.completeJob(id).subscribe({
    next:()=>{ 
      this.message = "Job complété";
      this.loadJob(); // recharge les infos du job
    },

    error:(err)=>{
       this.message = ErrorHandler.getErrorMessage(err);
    }
  });
  }
  
  //Gestion d'avis
  review = {
  target_id: '',
  rating: 5
  };

  submitReview() {
  const id = this.route.snapshot.paramMap.get('id');
  if(!id) return;
  this.jobService.submitReview(id, this.review).subscribe( {
    next:()=>{
      this.message = "Review envoyée";
       this.review = {
          target_id: '',
          rating: 5
        };
    },

    error:(err)=>{
      this.message = ErrorHandler.getErrorMessage(err);
    }
  });
  } 
}



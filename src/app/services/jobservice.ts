import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root'})
export class JobService {
  private apiUrl = "https://stingray-app-wxhhn.ondigitalocean.app";

  constructor(private http: HttpClient) {}
    //[C]RUD : Create des jobs
   createJob(data:any){
      return this.http.post(`${this.apiUrl}/jobs`, data);
    } 
    //C[R]UD : Voir toutes les jobs
    searchJobs(filters:any){
      return this.http.post(`${this.apiUrl}/jobs/search`, filters);
    }
    //C[R]UD : Voir une job
    getJobById(id: string) {
      return this.http.get(`${this.apiUrl}/jobs/${id}`);
    }
    //CR[U]D : Changer une job
    updateJob(jobId: number, data: any) {
      return this.http.patch(`${this.apiUrl}/jobs/${jobId}`, data);
    }

    /// Section POUR LES PROPOSALS
    submitProposal(jobId: string, data: any) {
      return this.http.post(`${this.apiUrl}/jobs/${jobId}/proposals`, data);
    }
    //C[R]UD : Voir toutes les propos
    getProposals(jobId: string) {
      return this.http.get(`${this.apiUrl}/jobs/${jobId}/proposals`);
    } 
    //CRU[D] : Supprimer une propo
    deleteProposal(proposalId: number) {
      return this.http.delete(`${this.apiUrl}/proposals/${proposalId}`);
    }

     /// Section Patch
    acceptProposal(proposalId: number) {
      return this.http.patch(`${this.apiUrl}/proposals/${proposalId}/accept`, {});
    }

    getMyJobs() {
      return this.http.get(`${this.apiUrl}/jobs/my-postings`);
    }   

    completeJob(jobId: string) {
      return this.http.patch(`${this.apiUrl}/jobs/${jobId}/complete`, {});
    }   

    /// Gestion d'Avis
    submitReview(jobId: string, data: any) {
      return this.http.post(`${this.apiUrl}/jobs/${jobId}/reviews`, data);
    }

    getUserReviews(userId: string) {
      return this.http.get(`${this.apiUrl}/reviews/user/${userId}`);
    }

    //stats pour PLATFORME
    getPlatformStats() {
      return this.http.get(`${this.apiUrl}/platform/stats`);
    }

}

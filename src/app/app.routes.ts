import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { Profile } from './profile/profile';
import { authGuard } from './guards/authguards';

import { Createjob } from './components/jobs/createjob/createjob';
import { Jobdetail } from './components/jobs/jobdetail/jobdetail';
import { Joblist } from './components/jobs/joblist/joblist';
import { Userreviews } from './components/reviews/userreviews/userreviews';
import { Stats } from './components/platform/stats/stats';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'profile', component: Profile, canActivate: [authGuard] },
  { path: '**', redirectTo: 'login' },

  { path: '', component: Joblist },
  { path: 'jobs/:id', component: Jobdetail },
  { path: 'create-job', component: Createjob },
  { path: 'stats', component: Stats },
  { path: 'reviews/:userId', component: Userreviews }
];
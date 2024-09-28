import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageOneComponent } from './pageone/pageone.component';
import { PageTwoComponent } from './pagetwo/pagetwo.component';

const routes: Routes = [
  { path: 'page-one', component: PageOneComponent },
  { path: 'page-two', component: PageTwoComponent },
  { path: '', redirectTo: '/page-one', pathMatch: 'full' }, // Default route
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }






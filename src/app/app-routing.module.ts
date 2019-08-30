import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//definisi component
import { MainComponent } from './pages/main/main.component';
import { PesertaComponent } from './pages/peserta/peserta.component';
import { ContactFormComponent } from './pages/contact-form/contact-form.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'main', component: MainComponent },
  { path: 'peserta', component: PesertaComponent },
  { path: 'kontak', component: ContactFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

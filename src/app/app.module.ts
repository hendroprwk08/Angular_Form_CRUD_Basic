import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//import
import { PesertaComponent } from './pages/peserta/peserta.component'; 
import { ContactFormComponent } from './pages/contact-form/contact-form.component';
import { MainComponent } from './pages/main/main.component';
import { UploadComponent } from './modules/upload/upload.component'; 

/*
component diletakkan pada "declaration"
fitur-fitur diletakkan pada "imports"
*/

@NgModule({
  declarations: [
    AppComponent,    
    MainComponent,
    PesertaComponent,
    ContactFormComponent,
    UploadComponent    
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

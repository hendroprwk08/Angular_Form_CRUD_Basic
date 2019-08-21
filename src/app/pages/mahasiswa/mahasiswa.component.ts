import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mahasiswa',
  templateUrl: './peserta.component.html',
  styleUrls: ['./peserta.component.css']
})
export class PesertaComponent implements OnInit {

  mode:string = "list";
  buttonGroupClass:string = "btn btn-primary active";

  fg: FormGroup;
  post:any;
  nama:string = '';
  institusi:string = ''; 
  whatsapp:string = '';
  telepon:string = '';
  email:string = '';
  
  constructor() { }

  _add(){ this.mode="add" }

  _edit( _id:string ){ this.mode = "edit"; }

  _list(){ this.mode = "list"; }

  ngOnInit() {  
  }
  
}

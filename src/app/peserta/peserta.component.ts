import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { PesertaApiService } from '../services/peserta-api.service';

@Component({
  selector: 'app-peserta',
  templateUrl: './peserta.component.html',
  styleUrls: ['./peserta.component.css']
})
export class PesertaComponent implements OnInit {
  output:any = [];
  fg:FormGroup;
  mode:string = "list";
  complete:boolean;
  
  constructor(private fb: FormBuilder, public pesertaApiService: PesertaApiService){
    //atur validasi -> pertama load
    this.fg = fb.group({
      'nama': [null, [
        Validators.required,
        Validators.minLength(3)
      ]],
      'institusi': [null,[        
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(500)
      ]],
      'whatsapp': [null,[        
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(15)
      ]],
      'telepon': [null,[        
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(15)
      ]],
      'email': [null, [
        Validators.required,
        Validators.email
      ]],
    });
  }

  //menangkap respon validator
  get f(){ return this.fg.controls; }

  _add(){ this.mode="add" }

  _edit( _id:string ){ this.mode = "edit" }

  _list(){ 
    this.mode = "list";

    this.complete = false;

    this.pesertaApiService.list().subscribe((output:any) => {
      this.output = output;
      this.complete = true
    });
 }

  _onReset(){ this.fg.reset() }

  _onPost(post){
    console.log(post);
  }

  ngOnInit() { this._list() }
}

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
  _deleteID:string;
  fg:FormGroup;
  mode:string = "list";
  complete:boolean;
  info:string;

  constructor(private fb: FormBuilder, public pesertaApiService: PesertaApiService){
    //atur validasi -> pertama load
    this.fg = fb.group({
      'action': ['1'],
      'id': [null],
      'name': [null, [
        Validators.required,
        Validators.minLength(3)
      ]],
      'institution': [null,[        
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(500)
      ]],
      'whatsapp': [null,[        
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(15)
      ]],
      'phone': [null,[        
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

  _edit( _id:string ){ 
    this.mode = "edit";
    this.info = null;

    this.complete = false;
    this.pesertaApiService.get( _id ).subscribe((output:any) => {
      //tampilkan data
      //console.log(output);
      
      this.fg.controls.id.setValue(output.result[0].ID);
      this.fg.controls.action.setValue('2');
      this.fg.controls.name.setValue(output.result[0].NAME);
      this.fg.controls.institution.setValue(output.result[0].INSTITUTION);
      this.fg.controls.whatsapp.setValue(output.result[0].WHATSAPP);
      this.fg.controls.phone.setValue(output.result[0].PHONE);
      this.fg.controls.email.setValue(output.result[0].EMAIL);

      this.complete = true;
    });
  }

  _confirm( _id:string, _name:string ) {    
    this.mode = "delete"; 
    this._deleteID = _id;

    this.info = "Hapus data " + _name;
    console.log(this.info);
  }

  _delete(){
    this.complete = false;
    this.pesertaApiService.delete(this._deleteID).subscribe((output:any) => {
      this.complete = true;
      this._list();
    });
  }

  _list(){ 
    this.mode = "list";

    this.complete = false;
    this.pesertaApiService.list().subscribe((output:any) => {
      this.output = output;
      this.complete = true
    });
 }

  _reset(){ 
    this.fg.reset(); 
    this.fg.controls.action.setValue('1');
    this.info = null;
  }

  _post(post){
    this.info = null;
    this.pesertaApiService.add(post).subscribe((output:any) => {
      //"result" name objek json. "reponse" name array
      //console.log(output.result[0].response);
      this.info = output.result[0].response;
    });

    this._reset();
  }

  _update(post){
    this.info = null;
    this.pesertaApiService.update(post).subscribe((output:any) => {
      //"result" name objek json. "reponse" name array
      //console.log(output.result[0].response);
      this.info = output.result[0].response;
    });
  }

  ngOnInit() { this._list() }
}

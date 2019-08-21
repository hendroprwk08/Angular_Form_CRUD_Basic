import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})

export class ContactFormComponent{
  //submitted = false;
  fg: FormGroup;
  post:any;
  deskripsi:string = '';
  nama:string = '';
  usia:string = '';
  valid:boolean = false;


  ngOnInit(){ }

  constructor(private fb: FormBuilder){
    //atur validasi -> pertama load
    this.fg = fb.group({
      'nama': [null, [
        Validators.required,
        Validators.minLength(3)
      ]],
      'deskripsi': [null,[        
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(500)
      ]],
      'usia': [null, [
        Validators.required,
        Validators.maxLength(2),
        Validators.min(18),
        Validators.max(65)
      ]],
      'valid': [false, [Validators.requiredTrue]],
    });
  }

  //menangkap respon validator
  get f(){ return this.fg.controls; }
  
  //cek
  addPost(post){
    //this.submitted = true;

    //jika form belum valid, maka gagalkan submit
    if(this.fg.invalid){ return; }

    console.log(post);
    this.nama = post.nama;
    this.deskripsi = post.deskripsi;
    this.usia = post.usia;
    this.valid = post.valid;
  }

  onReset(){
    //this.submitted = false;
    this.fg.reset();
  }  
}
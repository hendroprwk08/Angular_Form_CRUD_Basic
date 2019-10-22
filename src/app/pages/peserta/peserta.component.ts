import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { PesertaApiService } from 'src/app/services/peserta-api.service';
import { UploadService } from 'src/app/services/upload.service';

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
  imgURL:string;
  //selectedFile:File = null;
  selectedFile:string = null

  constructor( private fb: FormBuilder, 
    public pesertaApiService: PesertaApiService, 
    public uploadService: UploadService,
    public elementRef: ElementRef ){

    //atur validasi -> pertama load
    this.fg = fb.group({
      //'image':[null],
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

  _preview(event:any){
    console.log(event);
    var reader = new FileReader();

    reader.onload = (event: any) => {
        this.imgURL = event.target.result; //ambil nilai gambar agar bisa di "preview"
        //this.fg.controls.image.setValue(this.imgURL); //set ke Form Group
    }

    //event.target.files[0] tak bisa ditampilkan pada console.log
    reader.readAsDataURL(event.target.files[0]);

    //mengambil properti gambar: ukuran, jenis, url file sekaligus casting
    //this.selectedFile = <File>event.target.files[0]; 
    console.log(event.target.files[0]);
    this.selectedFile = event.target.files[0]; 
  }

  _removeImage(){
    this.imgURL = null;
    this.fg.controls.image.setValue(null);
  }

  _upload(){
    let files = this.elementRef.nativeElement.querySelector("#selectFile").files;
    let formData = new FormData();
    let file = files[0];

    //ambil data file berdasarkan ID
    formData.append("selectFile", file, file.name);

    this.uploadService.upload(formData).subscribe((output:any) => {
      console.log(output);
    });
  }
}

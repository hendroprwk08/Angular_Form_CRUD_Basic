import { Injectable } from '@angular/core';

//MODULE
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http:HttpClient) { }

  public upload(selectedFile: File){
    return Observable.create(observer => {
      const url = "http://event-lcc-me.000webhostapp.com/peserta.php";
    
      const fd = new FormData();
      fd.append('image', selectedFile, selectedFile.name);
      //console.log(url);
    
      this.http.post('url', fd).subscribe((respond:any) => {
        let outputs:any = {};
  
        //let data = { "status":respond.status, "data":respond.data};
        let result = respond;
        
        //console.log(result);
        observer.next(result);
        observer.complete();
        return {unsubcribe() {result}};	      
      });               
    });
  }
}

import { Injectable } from '@angular/core';

//MODULE
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http:HttpClient) { }

  public upload(formdata: any){
    let url:string = "http://localhost:80/php_event_middleware/upload.php"; 
    return this.http.post(url, formdata).pipe(
      catchError((error: Response) => {
        console.error("Error:"+ error);
        return Observable.throw(error || "Server bermasalah");
      })
    );
  }
}

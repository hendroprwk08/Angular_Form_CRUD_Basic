import { Injectable } from '@angular/core';

//MODULE
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
   providedIn: 'root'
})
export class PesertaApiService {
	
	constructor(private http:HttpClient) { }

	public list():Observable<any> {
		return Observable.create(observer => {
			const url = "http://event-lcc-me.000webhostapp.com/peserta.php?action=4";
			console.log(url);
			this.http.get(url).subscribe((respond:any) => {
				let outputs:any = [];

				//console.log(respond.result);

				//let data = { "status":respond.status, "data":respond.result };
				let result = respond.result;

				console.log(result + " " + result.length );

				if (result.length > 0) {
					for (let i = 0; i < result.length; i++) {
					
						let output = {
							"_id": result[i].ID, 
							"name": result[i].NAME, 
							"institution": result[i].INSTITUTION,
							"whatsapp": result[i].WHATSAPP,
							"phone": result[i].PHONE,
							"email": result[i].EMAIL,
						};

						console.log(output);
						outputs.push(output);
					}
				}
				
				observer.next(outputs);
				observer.complete();
				return {unsubcribe() {outputs}};				
			});
				
			});
	}
/*
	public get(_id:string):Observable<any> {
	    return Observable.create(observer => {
	      const url = "http://dc1.positivemc.co.id:11111/secure/common/get/student?_id="+_id;
	      console.log(url);
	      this.http.get(url).subscribe((respond:any) => {
	          let outputs:any = {};
	          let data = { "status":respond.status, "data":respond.data};

	          console.log(data);


	          observer.next(data.data);
	         observer.complete();
	         return {unsubcribe() {data.data}};
	        
	      });
	         
	    });
	}

	public add(data:any):Observable<any> {
	  return Observable.create(observer => {
	    const url = "http://dc1.positivemc.co.id:11111/secure/common/add/student";
	    console.log(url);
	    this.http.post(url, this.getFormUrlEncoded(data)).subscribe((respond:any) => {
	        let outputs:any = {};
	        let data = { "status":respond.status, "data":respond.data};

	        console.log(data);

	        observer.next(data.data);
	       observer.complete();
	       return {unsubcribe() {data.data}};
	      
	    });
	       
	  });
	}

	protected getFormUrlEncoded(toConvert){
	  const formBody = [];
	  for (const property in toConvert){
	    const encodedKey = encodeURIComponent(property);
	    const encodedValue = encodeURIComponent(toConvert[property]);
	    formBody.push(encodedKey + '=' + encodedValue);
	  }
	  return formBody.join('&');
	}
  */
}

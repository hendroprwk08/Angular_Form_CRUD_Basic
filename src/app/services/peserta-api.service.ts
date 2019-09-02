import { Injectable } from '@angular/core';

//MODULE
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
   providedIn: 'root'
})
export class PesertaApiService {

	base_url:string = "http://localhost:80/PHP_Event_Middleware/";

	constructor(private http:HttpClient) { }

	public list():Observable<any> {
		return Observable.create(observer => {
			//console.log(url);
			this.http.get(this.base_url + "peserta.php?action=4").subscribe((respond:any) => {
				let outputs:any = [];

				//console.log(respond.result);

				//let data = { "status":respond.status, "data":respond.result };
				let result = respond.result;

				//console.log(result + " " + result.length );

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

						//console.log(output);
						outputs.push(output);
					}
				}
				
				observer.next(outputs);
				observer.complete();
				return {unsubcribe() {outputs}};				
			});				
		});
	}

	public get(_id:string):Observable<any> {
	    return Observable.create(observer => {		
	    	this.http.get(this.base_url + "peserta.php?action=6&id=" + _id).subscribe((respond:any) => {
				let outputs:any = {};
	          	//let data = { "status":respond.status, "data":respond.data};

				let result = respond;
	          	//console.log(respond);

	          	observer.next(respond);
	         	observer.complete();
	         	return {unsubcribe() {respond}};
	      	});	         
	    });
	}

	public add(data:any):Observable<any> {
	  return Observable.create(observer => {
		//const url = "http://event-lcc-me.000webhostapp.com/peserta.php";
			
		//console.log(url);
		this.http.post(this.base_url + "peserta.php?" + this.getFormUrlEncoded(data), null).subscribe((respond:any) => {		
	    //this.http.post(url, this.getFormUrlEncoded(data)).subscribe((respond:any) => {
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

	public delete(_id:string):Observable<any> {
		return Observable.create(observer => {
		  
			//console.log(url);
		  	this.http.post(this.base_url + "peserta.php?action=3&id=" + _id , null).subscribe((respond:any) => {		
			  	let result = respond;
			  
			  	console.log(result);
  
			  	observer.next(result);
				observer.complete();
				return {unsubcribe() {result}};	      
		  });
					 
		});
	}

	public update(data:any):Observable<any> {
		return Observable.create(observer => {
		  //console.log(url);
		  this.http.post(this.base_url + "peserta.php?" + this.getFormUrlEncoded(data), null).subscribe((respond:any) => {		
			  let outputs:any = {};
  			  let result = respond;
			  
			  console.log(result);
  
			  observer.next(result);
				 observer.complete();
				 return {unsubcribe() {result}};	      
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
}

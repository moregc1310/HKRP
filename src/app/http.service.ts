import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }


  baseUrl:string=" http://localhost:3000/"
  httpHeaders:HttpHeaders=new HttpHeaders()
                           .set("content-type","application/json")


                           postDataToServer(endpoint:string,data:any){
                            const url= this.baseUrl + endpoint ;
                           return this.http.post(url,data,{headers:this.httpHeaders});
                          }


                          getDataFromServer(endpoint:string){
                            const url= this.baseUrl + endpoint ;
                            return this.http.get(url,{headers:this.httpHeaders})
                          }
}

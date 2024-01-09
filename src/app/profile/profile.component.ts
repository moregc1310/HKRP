import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpService } from '../http.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  users:any=[];
  successMessage: boolean = false;

constructor(private http:HttpService, private httpClient: HttpClient){

}

  ngOnInit(): void {
    this.http.getDataFromServer("users").subscribe((el:any)=>{
      this.users=el;
      console.log(this.users);
    })
  }


  // editProfile(user: any): void {
  //   const userId = user.id;
  //   const editedUser = { ...user };

  //   this.httpClient.put(`http://localhost:3000/users/${userId}`, editedUser)
  //     .subscribe((response: any) => {
  //       console.log('User updated successfully:', response);
  //     }, error => {
  //       console.error('Error updating user:', error);
  //     });
  // }


  editProfile(user: any): void {
    const userId = user.id;
    const editedUser = { ...user };

    this.httpClient.put(`http://localhost:3000/users/${userId}`, editedUser).subscribe(
      (response: any) => {
        console.log('User updated successfully:', response);
        // Set successMessage to true to display the popup
        this.successMessage = true;

        // Reset successMessage after a few seconds (optional)
        setTimeout(() => {
          this.successMessage = false;
        }, 3000);
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );
  }
  
  
}


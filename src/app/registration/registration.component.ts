import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit{
  registrationForm!: FormGroup;
  interests: string[] = [];

  constructor(private formBuilder: FormBuilder,private http:HttpService,private router:Router) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      photo: [null, Validators.required], // Add validation for photo size
      age: [18, Validators.required],
      interests: this.formBuilder.array(['crickt']),
      fName:[''],
      lName:[''],
      addressLine1:[''],
      addressLine2:['']
    });
  }

  onPhotoChange(event: any): void {
   
    const photo = event.target.files[0];
    
    this.registrationForm.patchValue({
      photo: photo,
    });
  }

  removeInterest(index: number): void {
    this.interests.splice(index, 1);
    this.updateInterestsFormArray();
  }

  private updateInterestsFormArray(): void {
    const interestsControl = this.registrationForm.get('interests') as FormArray;
    interestsControl.clear();
    this.interests.forEach(interest => interestsControl.push(this.formBuilder.control(interest)));
  }

  onSubmit() {
    
    console.log('Form submitted:', this.registrationForm.value);
  }


  signUp(){
    console.log(this.registrationForm.value);
    this.http.postDataToServer("users",this.registrationForm.value).subscribe((el:any)=>{
      this.router.navigate(['/profile']);
    })
  }
  

}

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
[x: string]: any;
  registrationForm!: FormGroup;
  interests: string[] = [];

  constructor(private formBuilder: FormBuilder,private http:HttpService,private router:Router) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      photo: [null, Validators.required], // Add validation for photo size
      age: [18, Validators.required],
      interests: this.formBuilder.array(['crickt']),
      
      fName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20), Validators.pattern("[a-zA-Z]+")]],
      lName:['',[Validators.required, Validators.minLength(1), Validators.maxLength(20), Validators.pattern("[a-zA-Z]+")]],
      addressLine1:[''],
      addressLine2:['']
    });
  }

  // onPhotoChange(event: any): void {
   
  //   const photo = event.target.files[0];
    
  //   this.registrationForm.patchValue({
  //     photo: photo,
  //   });
  // }

  onPhotoChange(event: any): void {
    const photo = event.target.files[0];
  
    if (photo) {
      const reader = new FileReader();
  
      reader.onloadend = () => {
        this.registrationForm.patchValue({
          photo: photo,
          photoBase64: reader.result as string
        });
      };
  
      reader.readAsDataURL(photo);
    }
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
    if (this.registrationForm.valid) {
      this.signUp();
    }
  }

  // signUp() {
  //   this.http.postDataToServer("users", this.registrationForm.value).subscribe(
  //     (response: any) => {
  //       // Handle successful response
  //       console.log('Form submitted successfully:', response);
  //       this.router.navigate(['/profile']);
  //     },
  //     (error: any) => {
  //       // Handle error
  //       console.error('Form submission failed:', error);
  //     }
  //   );
  // }

  signUp() {
    if (this.registrationForm.valid) {
      const formData = { ...this.registrationForm.value, photo: this.registrationForm.value.photoBase64 };
      
      this.http.postDataToServer("users", formData).subscribe(
        (response: any) => {
          // Handle successful response
          console.log('Form submitted successfully:', response);
          this.router.navigate(['/profile']);
        },
        (error: any) => {
          // Handle error
          console.error('Form submission failed:', error);
        }
      );
    }
  }


  

  get fName(){
    return this.registrationForm.controls['fName'];
  }

  get lName(){
    return this.registrationForm.controls['lName'];
  }
  

}

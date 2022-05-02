import { Component, OnInit } from '@angular/core';
import{FormGroup, FormBuilder, Validators, AbstractControlOptions}from '@angular/forms';
 import{rangeValidator, emailMatchValidator} from'../my-validator'
@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  employeeFormGroup:FormGroup;
  // formOptions: AbstractControlOptions = {validators:emailMatchValidator};
  constructor(private fb: FormBuilder) { 
    this.employeeFormGroup = this.fb.group({
    firstName: ['',[Validators.required, Validators.minLength(3)]],
    lastName: [''],
    emailGroup: this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      confirmEmail:['',[Validators.required,Validators.email]]
    }, {Validators:emailMatchValidator}),
    // this.formOptions),
    
    mobile: [''],
    sendNotification:['email'],
    range:['', [rangeValidator(10,20)]]
  }); }

  ngOnInit(): void {
   
  }
 // ! is non-null assertion (post-fix expression)
 // - it just saying to type checker that you're sure that 'a' is not null or undefined
 // the operation a! produces a value of the type of 'a' with null and undefined excluded
 //if a is a type String then a! ensure that it will return a string value, and not nnull or undefined
get firstName() { return this.employeeFormGroup.get('firstName')!;}
get emailGroup() { return this.employeeFormGroup.get('emailGroup')!;}
get email() { return this.employeeFormGroup.get('email')!;}
get range() { return this.employeeFormGroup.get('range')!;}
get mobile() { return this.employeeFormGroup.get('mobile')!;}

loadEmployee(){
  let data = {
    firstName:'Jensi',
    lastName: 'Magsty'
  }
  this.employeeFormGroup.patchValue(data);
}
doNotification(msgtype:any){
  if(msgtype === 'sms'){
  let mobileControl= this.employeeFormGroup.get('mobile');
  mobileControl?.setValidators(
    [Validators.required, rangeValidator(8000000000,9999999999)]);
  mobileControl?.updateValueAndValidity();
  }
}
}

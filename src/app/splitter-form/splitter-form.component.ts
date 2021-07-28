import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-splitter-form',
  templateUrl: './splitter-form.component.html',
  styleUrls: ['./splitter-form.component.css']
})
export class SplitterFormComponent implements OnInit {
  splitForm: FormGroup;
 
  constructor(private fb:FormBuilder) { }
  
  ngOnInit(): void {
    this.splitForm = this.fb.group({
      billAmount: new FormControl('',[Validators.required,Validators.pattern('\\d+([.]\\d+)?')]),
      fivePercent: new FormControl(''),
      tenPercent: new FormControl(''),
      fiftnPercent: new FormControl(''),
      twfPercent: new FormControl(''),
      fiftyPercent: new FormControl(''),
      customPercent: new FormControl('',[Validators.required,Validators.pattern('\\d+([.]\\d+)?')]),
      dollarTip: new FormControl(''),
      dollarTotal: new FormControl(''),
      numPpl:new FormControl('',[Validators.required,Validators.pattern('\\d+([.]\\d+)?')]),
      resetBtn:new FormControl('')
    });
  }

  


onReset(){
  this.splitForm.reset();
}

calculateTip(){
  if(this.splitForm.valid && 
    (this.splitForm.get('numPpl')?.value!=0 && 
    this.splitForm.get('numPpl')?.value != undefined))     
    {
      return ((this.splitForm.get('customPercent')?.value / 100) * 
              this.splitForm.get('billAmount')?.value/
              this.splitForm.get('numPpl')?.value).toFixed(2);

    }
  else{
    return 0;
  }
 
}
calculateTotal(){
  if(this.splitForm.valid && 
    (this.splitForm.get('numPpl')?.value!=0 && 
    this.splitForm.get('numPpl')?.value != undefined))     
    {
      return (this.splitForm.get('billAmount')?.value/this.splitForm.get('numPpl')?.value).toFixed(2);
    }
  else{
    return 0;
  }
 
}

}

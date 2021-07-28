import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-splitter-form',
  templateUrl: './splitter-form.component.html',
  styleUrls: ['./splitter-form.component.css']
})
export class SplitterFormComponent implements OnInit {
  splitForm: FormGroup;
  customHidden:boolean=false;
  constructor(private fb:FormBuilder) { }
  
  ngOnInit(): void {
    this.splitForm = this.fb.group({
      billAmount: new FormControl('',[Validators.required,Validators.pattern('\\d+([.]\\d+)?')]),
      tipPercent: new FormControl('',Validators.required),
      customPercent: new FormControl('',Validators.pattern('\\d+([.]\\d+)?')),
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
      return Number((this.splitForm.get('customPercent')?.value / 100) * 
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
      return (Number((this.splitForm.get('billAmount')?.value/this.splitForm.get('numPpl')?.value)) +
      Number(((this.splitForm.get('customPercent')?.value / 100) * 
      this.splitForm.get('billAmount')?.value/
      this.splitForm.get('numPpl')?.value))).toFixed(2);
      
    }
  else{
    return 0;
  }
 
}

handleCustom($event:Event):boolean {
  this.customHidden=$event.returnValue;
  return this.customHidden;
}

checkCustom() {
  return this.customHidden;
}

setCustomoff() {
  this.customHidden=false;
}

}

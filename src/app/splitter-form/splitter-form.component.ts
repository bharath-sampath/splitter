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
  tipPercentage:number=0;
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

customOrCanned():number {
  if (this.splitForm.get('tipPercent')?.value !== "0"){
    return this.tipPercentage;
  }
  else
  {
    return this.splitForm.get('customPercent')?.value
  }
}

calculateTip(){

  if(this.splitForm.valid &&
    (this.splitForm.get('numPpl')?.value!=0 &&
    this.splitForm.get('numPpl')?.value != undefined))
    {
      return Number((this.customOrCanned() / 100) *
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
      Number(((this.customOrCanned()/ 100) *
      this.splitForm.get('billAmount')?.value/
      this.splitForm.get('numPpl')?.value))).toFixed(2);

    }
  else{
    return 0;
  }

}

handleCustom($event:Event):boolean {
  this.customHidden=$event.returnValue;
  this.tipPercentage = this.splitForm.get('customPercent')?.value;
  return this.customHidden;
}

checkCustom() {
  return this.customHidden;
}

setCustomoff(tip:number) {
  this.customHidden=false;
  this.tipPercentage = tip;
  this.splitForm.get('customPercent')?.patchValue("");
}

checkError(fieldName:string) {

  if (!this.splitForm.get(fieldName)?.dirty && !this.splitForm.get(fieldName)?.touched) {
    return true
  }
  else
  {
    return this.splitForm.get(fieldName)?.valid;
  }

}

}

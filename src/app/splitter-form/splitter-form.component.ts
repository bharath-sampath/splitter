import { Component, OnInit,Renderer2,ElementRef, ViewChild } from '@angular/core';
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
  constructor(private fb:FormBuilder,private renderer:Renderer2) { }

  @ViewChild('custom') custom: ElementRef;
  @ViewChild('billamt') billamt: ElementRef;

  ngOnInit(): void {

    this.splitForm = this.fb.group({
      billAmount: new FormControl('',[Validators.required,Validators.pattern('\\d+([.]\\d+)?'),
          Validators.max(999999999),Validators.min(1)]),
      tipPercent: new FormControl('',Validators.required),
      customPercent: new FormControl('',[Validators.pattern('\\d+([.]\\d+)?'),Validators.min(1),Validators.max(100)]),
      dollarTip: new FormControl(''),
      dollarTotal: new FormControl(''),
      numPpl:new FormControl('',[Validators.required,Validators.pattern('\\d+([.]\\d+)?'),Validators.min(1)]),
      resetBtn:new FormControl('')
    });


  }

onReset(){
  this.splitForm.reset();
  this.setCustomoff();
  this.billamt.nativeElement.focus();
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

calculateTip():number{

  if(this.splitForm.valid &&
    (this.splitForm.get('numPpl')?.value!=0 &&
    this.splitForm.get('numPpl')?.value != undefined))
    {

      if (this.splitForm.get('billAmount')?.value>999999999) return 0;

    return Number((Number(this.customOrCanned() / 100) *
              Number(this.splitForm.get('billAmount')?.value)/
              Number(this.splitForm.get('numPpl')?.value)).toFixed(2));

    }
  else{
    return 0;
  }

}
calculateTotal():number{
  if(this.splitForm.valid &&
    (this.splitForm.get('numPpl')?.value!=0 &&
    this.splitForm.get('numPpl')?.value != undefined))
    {

      if (this.splitForm.get('billAmount')?.value>999999999) return 0;

      return Number(((Number((this.splitForm.get('billAmount')?.value/this.splitForm.get('numPpl')?.value)) +
      Number(((this.customOrCanned()/ 100) *
      this.splitForm.get('billAmount')?.value/
      this.splitForm.get('numPpl')?.value)))).toFixed(2));

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





setCustomoff(tip?:number) {
  this.customHidden=false;

  this.splitForm.get('customPercent')?.patchValue("");
  if(tip != undefined) {
    this.tipPercentage = tip;
  }
}

checkError(fieldName:string) {

  if (!this.splitForm.get(fieldName)?.dirty && !this.splitForm.get(fieldName)?.touched) {
    return true
  }
  else
  {
    if (this.splitForm.get(fieldName).value==="0") return false;
    return this.splitForm.get(fieldName)?.valid;
  }

}

}

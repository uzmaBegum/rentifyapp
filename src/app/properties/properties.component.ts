import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PropertyService } from '../shared/property.service';
import { Property } from './property.model';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent {
allproperty :any;
formValue: any;
propertyModelObj:Property =new Property();
showAdd!:boolean;
showEdit!:boolean;
count: number = 0; 
propertydata: any;
constructor(private fb:FormBuilder,private api:PropertyService){}

ngOnInit(){
  this.formValue = this.fb.group({
    ptitle :[''],
    pprice :[''],
    plocation :[''],
    pdetails :[''],

  })
  this.getAllProperty();
}

getAllProperty(){
  this.api.getAllProp().subscribe((res:any)=>{
    this.allproperty =res;
    console.warn(this.allproperty)
  })
}

clickAddProp(){
this.formValue.reset();
this.showAdd =true;
this.showEdit = false;
}

clickCount(): void{
  this.count++
  }

displayPermission(data:any){
    data.open = !data.open;
}
populateForm(data: Property) {
  this.propertydata = data;
  this.formValue.patchValue({
    ptitle: data.ptitle,
    pptice: data.pprice,
    plocation: data.plocation,
    pdetails: data.pdetails,
  });
}

editUser(data: Property) {
  this.formValue.populateForm(data);
}
deleteProperty(data:any){
  console.log('data--',data)
  this.api.deleteProperty(data.id).subscribe((res:any)=>{
    console.log('res',res)
    alert('Property Delete SuccessFul!');
    this.getAllProperty()
  })
}
addProperty(){
  console.log('Here is the data', this.formValue.value)
  this.propertyModelObj.ptitle = this.formValue.value.ptitle;
  this.propertyModelObj.pprice = this.formValue.value.pprice;
  this.propertyModelObj.plocation = this.formValue.value.plocation;
  this.propertyModelObj.pdetails = this.formValue.value.pdetails;
  this.api.addListing(this.propertyModelObj).subscribe((res:any)=>{
    console.log('res', res);
    let ref =document.getElementById('clear');
    ref?.click();
    this.formValue.reset();
    this.getAllProperty();
  }, err =>{
    console.log('Err',err)
  })
}
}

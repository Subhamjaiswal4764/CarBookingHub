import { LightningElement, wire, api,track} from 'lwc';
import {getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';


import CAR_OBJECT from '@salesforce/schema/Car__c';
import CAR_CATEGORY  from '@salesforce/schema/Car__c.Category__c';
import CAR_MAKE from '@salesforce/schema/Car__c.Make__c';

const CAR_MAKE_ERROR='error loading car make type';
const CAR_CATEGORY_ERROR='error loading car category type';
export default class CarFilter extends LightningElement {
     
    carM
    carC
    
    car_make_error_msg=CAR_MAKE_ERROR
    car_category_error_msg=CAR_CATEGORY_ERROR
    filters={
        searchKey:'',
        maxPrice:99999
    }

    @wire(getObjectInfo, { objectApiName: CAR_OBJECT })
    CarInfo;
    
    @wire(getPicklistValues, { recordTypeId: '$CarInfo.data.defaultRecordTypeId', fieldApiName: CAR_CATEGORY  })
    carMake({data,error}){
        if(data)
        {
            this.carC=data;
           console.log("CARRCCCCCC---"+JSON.stringify(this.carC));
        }
    }
    
    @wire(getPicklistValues, { recordTypeId: '$CarInfo.data.defaultRecordTypeId', fieldApiName:CAR_MAKE  })
    property({data,error}){
        if(data)
        {
            this.carM=data;
        //    console.log("CARRMMMMMMMMMM---"+JSON.stringify(this.carC));
        }
    }
    handleInputChange(event){
        console.log(event.target.value);
    }

    sliderChange(event){
        console.log(event.target.value);
    }
    handleCarMakeRadio(event)
    {
        const{name,value}=event.target.dataset;
        console.log("name"+name);
        console.log("value"+value);
        
    }
    
    

    
 








    
    /**
     * for printing the car make type 
     */
    //  @wire(getPicklistValues, { recordTypeId: 'CarInfo.data.defaultRecordTypeId', fieldApiName: CAR_MAKE })
    // propertyOrFunction({data,error}){
    //     if(data){
    //         this.car_m=data;
    //         console.log('car_category'+this.car_category);
    //     }
    //     if(error){
    //         console.error(car_make_error_msg);
    //     }
    // }


}
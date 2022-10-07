import { LightningElement, wire, api} from 'lwc';
import {getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
//importing LMS 
import {publish , MessageContext } from 'lightning/messageService';
import CARS_FILTERED_MSG_CHANNEL from '@salesforce/messageChannel/CarsFiltered__c';


import CAR_OBJECT from '@salesforce/schema/Car__c';
import CAR_CATEGORY  from '@salesforce/schema/Car__c.Category__c';
import CAR_MAKE from '@salesforce/schema/Car__c.Make__c';

// const CAR_MAKE_ERROR='error loading car make type';
// const CAR_CATEGORY_ERROR='error loading car category type';
export default class CarFilter extends LightningElement {
     
    carM
    carC
    
    // car_make_error_msg=CAR_MAKE_ERROR
    // car_category_error_msg=CAR_CATEGORY_ERROR
    filters={
        searchKey:'',
        maxPrice:99999999
    }
    @wire(MessageContext)
    messageContextProperty

   

    @wire(getObjectInfo, { objectApiName: CAR_OBJECT })
    CarInfo
    
    @wire(getPicklistValues, { recordTypeId: '$CarInfo.data.defaultRecordTypeId', fieldApiName: CAR_CATEGORY  })
    carC
    
    
    @wire(getPicklistValues, { recordTypeId: '$CarInfo.data.defaultRecordTypeId', fieldApiName:CAR_MAKE  })
    carM
    
    handleInputChange(event){
       
        this.filters={...this.filters,'searchKey':event.target.value}
        console.log(" in the search key input")
        console.log(this.filters);
        this.sendDataToCarTileList();
    }

    sliderChange(event){
       
        console.log(" in the price finding slider ")
        this.filters={...this.filters,'maxPrice':event.target.value}
        console.log(this.filters);
        this.sendDataToCarTileList();
    }
    handleCarMakeRadio(event)
    {
        const{name,value}=event.target.dataset;
        console.log("name"+name);
        console.log("value"+value);
      
        
    }
    sendDataToCarTileList(){
        publish(this.messageContextProperty, CARS_FILTERED_MSG_CHANNEL, {
            filteredData: this.filters
        })
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
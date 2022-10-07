import { LightningElement, wire, api} from 'lwc';
import {getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
//importing LMS 
import {publish , MessageContext } from 'lightning/messageService';
import CARS_FILTERED_MSG_CHANNEL from '@salesforce/messageChannel/CarsFiltered__c';


import CAR_OBJECT from '@salesforce/schema/Car__c';
import CAR_CATEGORY  from '@salesforce/schema/Car__c.Category__c';
import CAR_MAKE from '@salesforce/schema/Car__c.Make__c';

const CAR_MAKE_ERROR='error loading car make type';
const CAR_CATEGORY_ERROR='error loading car category type';
export default class CarFilter extends LightningElement {
     
    
    timer
    
    car_make_error_msg=CAR_MAKE_ERROR
    car_category_error_msg=CAR_CATEGORY_ERROR
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
    // handleCarMakeRadio(event)
    // {
    //     // if(!this.filters.carC){
    //     //     console.log("in the first if")
    //     //     const carC=this.carC.data.values.map(item=>item.value)
    //     //     const carM=this.carM.data.values.map(item=>item.value)
    //     //     this.filters={...this.filters, carC, carM}
    //     //     // this.filters={...this.filters,carM:carM}
    //     // }
    //     console.log('when itis not tehir carc');
    //     console.log(this.filters)
    //     const{name,value}=event.target.dataset;
    //     console.log("name"+name);
    //     console.log("value"+value);
    //   if(event.target.checked){
    //     console.log("i am checked");
    //     if(!this.filter[name].includes(value)){
    //     this.filters[name] = [...this.filters[name], value]
    //     console.log('if');
    //     console.log(this.filters)
    //   }
    // }
    //   else{
    //     this.filters[name]= this.filters[name].filter(item=>item !== value)
    //     console.log('else');
    //     console.log(this.filters)
    //   }
    //     this.sendDataToCarTileList();
    // }
    handleCarMakeRadio(event){
        if(!this.filters.carC){
            const carC = this.carC.data.values.map(item=>item.value)
            const carM = this.carM.data.values.map(item=>item.value)
            this.filters = {...this.filters, carC, carM}
        }
        const {name, value} = event.target.dataset
        // console.log("name", name)
        // console.log("value", value)
        if(event.target.checked){
            if(!this.filters[name].includes(value)){
                this.filters[name] = [...this.filters[name], value]
            }
        } else {
            this.filters[name] =  this.filters[name].filter(item=>item !==value)
        }
        this.sendDataToCarList()
    }

    sendDataToCarTileList(){
        window.clearTimeOut(this.timer);
        this.timer=window.setTimeout(() => {
            publish(this.messageContextProperty, CARS_FILTERED_MSG_CHANNEL, {
                filteredData: this.filters
            })  
        }, 400);
       
    }
 
}
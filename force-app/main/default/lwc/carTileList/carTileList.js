import { LightningElement,api,wire } from 'lwc';
//importing LMS 
import CARS_FILTERED_MSG_CHANNEL from '@salesforce/messageChannel/CarsFiltered__c';
import {subscribe,MessageContext } from 'lightning/messageService';

import carsFetchMethod from '@salesforce/apex/CarsFetch.carsFetchMethod';
export default class CarTileList extends LightningElement {

    cars;
    carSubscription;
    filters={};
    @wire(carsFetchMethod,{filters:'$filters'})
     cars({data,error})
    {
        console.log("Apex returned data");
        console.log(data)
        this.cars=data;
       
    }

    @wire(MessageContext)
    messageContextProperty

    //onload subscribing the msg publishe by Filters
    connectedCallback(){
        this.subscribeMsg();
    }
    subscribeMsg(){
        this.carSubscription=subscribe(this.messageContextProperty, CARS_FILTERED_MSG_CHANNEL, (message)=>this.handleRecievedMsg(message));
    }
    handleRecievedMsg(message){
        console.log("recieving messages")
        console.log(message);
        // this.filters={...this.filters,"searchKey":message.filter.searchKey}
        this.filters={...message.filteredData}
        console.log("afterr reciving msg this.filter is below ")
        console.log( this.filters);

    }
}
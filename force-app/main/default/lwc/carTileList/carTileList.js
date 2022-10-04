import { LightningElement,api,wire } from 'lwc';

import getCars from '@salesforce/apex/CarsFetch.carsFetchMethod'
export default class CarTileList extends LightningElement {

    cars
    
    @wire(getCars)
    cars({data,error})
    {
        console.log("data"+JSON.stringify(data));
        this.cars=data;
    }
}
import { LightningElement } from 'lwc';

export default class AccordianBasic extends LightningElement {
    handleSectionToggle(){

    }
    handleClick(event){
        console.log('button clicked');
this.template.querySelectorAll('.ab').forEach(ele=>{
    
    // console.log()
    ele.classList.remove('ab');
    ele.classList.add('c');
})
    }
}
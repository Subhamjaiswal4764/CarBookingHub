public with sharing class CarsFetch {
    @AuraEnabled(Cacheable=true)
    public static List<Car__c> carsFetchMethod() {
        return[SELECT Name, Category__c, Control__c, Fuel_Type__c, Make__c, MSRP__c, Number_of_Seats__c, Picture_URL__c FROM Car__c];
    }
    
}

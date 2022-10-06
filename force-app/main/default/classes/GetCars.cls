public with sharing class GetCars {
    public static List<Car__c> getCarDetails() {
        return[SELECT Name, Category__c,Control__c, Fuel_Type__c, Make__c, MSRP__c,Number_of_Seats__c, Picture_URL__c from Car__c];
    }
}

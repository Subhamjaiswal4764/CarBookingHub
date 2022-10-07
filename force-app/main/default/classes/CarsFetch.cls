public with sharing class CarsFetch {
    //wrapper class
    public class Filters {
        @AuraEnabled
        public String searchKey {get; set;}
        @AuraEnabled
        public Decimal maxPrice {get; set;}
        @AuraEnabled
        public String[] carC {get; set;}
        @AuraEnabled
        public String[] carM {get; set;}
    }

    @AuraEnabled(Cacheable=true)
    public static List<Car__c> carsFetchMethod(Filters filters) {
        String key,whereClause='';
        Decimal maxPrice;
        String[] carC,carM,criteria= new List<String>{};
        
        if(filters!=null)
        {
            maxPrice=filters.maxPrice;
            carC=filters.carC;
            carM=filters.carM;
            if(!String.isEmpty(filters.searchKey)){
               
                key= '%'+ filters.searchKey + '%';
                criteria.add('Name LIKE : key');
            }
            if(filters.maxPrice >=0){
                criteria.add('MSRP__c <= :maxPrice');
            }
            if(filters.carC !=null){
                criteria.add('Category__c IN :carC');
            }
            if(filters.carM !=null){
                criteria.add('Make__c IN :carM');
            }
            if(criteria.size()>0)
            {
                whereClause= 'WHERE ' + String.join(criteria,' AND ' );
            }
        }

// debug code 


      
       
        
// return[SELECT Id, Name, Make__c, MSRP__c, Description__c, Category__c, Picture_URL__c FROM Car__c];
         String query='SELECT Id, Make__c, Name, MSRP__c, Description__c, Category__c, Picture_URL__c FROM Car__c ' + whereClause + ' WITH SECURITY_ENFORCED ORDER BY Name';
         return Database.query(query);
    }
    
}
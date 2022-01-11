sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel"
], function (UIComponent, JSONModel, ResourceModel){
    "use strict";
    return UIComponent.extend("sap.ui.demo.walkthrough.Component", {
        metadata : {
            "interfaces" : ["sap.ui.core.IAsyncContentCreation"],
            "rootView":{
                "viewName":"sap.ui.demo.walkthrough.view.App",
                "type" : "XML",
                "id":"app"
            }
        },
        init : function () {
            //call the init function of the parent
            UIComponent.prototype.init.apply(this, arguments);
            //set data 
            var sUrl = "https://localhost:44339/v1/contacts"
         var that = this;

         $.ajax({
            type: "GET",
            contentType: "application/json",
            url: sUrl,
            datatype: "json",
            success: function (data, textStatus, jqXHR) {

               for (var i = 0; i < data.length; i++) {
                  var sMsg = "Name: " + data[i].name + "\n" +
                     "Phone: " + data[i].phone + "\n" +
                     "address: " + data[i].street + "\n" +
                     "City: " + data[i].city

                    
               }

               MessageToast.show(sMsg);


            },
            error: function (data, textStatus, jqXHR) {
               //Caso ocorra um erro ao solicitar dados a função error será chamada                    
               console.log(textStatus);
            }
         });


            var oData = {
                recipient : {
                    
                }
            };       

            var oModel = new JSONModel(oData);
            this.setModel(oModel);

            // set i18n model
            var i18nModel = new ResourceModel({
                bundleName : "sap.ui.demo.walkthrough.i18n.i18n"
            });
        }        
    })
}
)
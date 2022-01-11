sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/m/MessageToast",
   "sap/ui/model/json/JSONModel",
   "sap/ui/model/resource/ResourceModel",
   "sap/ui/core/Fragment",

], function (Controller, MessageToast, JSONModel, ResourceModel, Fragment) {
   "use strict";
   return Controller.extend("sap.ui.demo.walkthrough.controller.App", {
      onInit: function () {
         // set data model on view
         var oData = {
            recipient: {
               name: "",
               phone: "",
               address: "",
               city: ""
            }
         };
         var oModel = new JSONModel(oData);
         this.getView().setModel(oModel);
         // set i18n model on view
         var i18nModel = new ResourceModel({
            bundleName: "sap.ui.demo.walkthrough.i18n.i18n"
         });
         this.getView().setModel(i18nModel, "i18n");
      },
      onShowHello: function () {
         // read msg from i18n model
         var oBundle = this.getView().getModel("i18n").getResourceBundle();
         var msgName = this.getView().getModel().getProperty("/recipient/name");
         var msgStreet = this.getView().getModel().getProperty("/recipient/address");
         var msgCity = this.getView().getModel().getProperty("/recipient/city");
         var msgNumber = this.getView().getModel().getProperty("/recipient/phone");
         //--
         var sMsg = oBundle.getText(msgName +
            " | " + msgStreet +
            " | " + msgCity +
            " | " + msgNumber);
         // show message
         MessageToast.show(sMsg);
         console.log(sMsg);
      },
      onOpenDialog: function () {
         if (!this.pDialog) {
            this.pDialog = this.loadFragment({
               name: "sap.ui.demo.walkthrough.view.HelloDialog"
            });
         }
         this.pDialog.then(function (oDialog) {
            oDialog.open();
         })
      },
      onCloseDialog: function () {
         this.byId("helloDialog").close();
      },


      obterContatos: function () {
         var sUrl = "https://localhost:44339/v1/contacts";
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

      },
      saveContact: function () {
         var name = this.getView().getModel().getProperty("/recipient/name");
         var street = this.getView().getModel().getProperty("/recipient/address");
         var city = this.getView().getModel().getProperty("/recipient/city");
         var phone = this.getView().getModel().getProperty("/recipient/phone");

         var sUrl = "https://localhost:44339/v1/contacts";

         var data = { "name": name, "phone": phone, "street": street, "city": city };
         $.ajax({
            url: sUrl,
            dataType: "json",
            type: "POST",
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (data, textStatus, xhr) {
               alert("Sucess");
               console.log("sukses: " + data + " " + JSON.stringify(xhr));
            }
         });
      },
      deleteContact: function () {
         var phone = this.getView().getModel().getProperty("/recipient/find");
         
         var sUrl = `https://localhost:44339/v1/contacts/delete-contact/${phone}`;

         $.ajax({
            url: sUrl,
            type: "DELETE",            
            contentType: "application/json",
            dataType: "text",
            sucess: function (data, textStatus, jqXHR) {
               alert("DELETE: Sucess");
            },
            error: function (data, textStatus, jqXHR) {
               //Caso ocorra um erro ao solicitar dados a função error será chamada                    
               console.log(textStatus);
            }
         });
      },
      findByPhone: function () {
         var phone = this.getView().getModel().getProperty("/recipient/find");
         console.log(phone);
         var sUrl = `https://localhost:44339/v1/contacts/get-contact/${phone}`;
         $.ajax({
            type: "GET",
            contentType: "application/json",
            url: sUrl,
            datatype: "json",
            success: function (data, textStatus, xhr) {
               alert(data[0].phone);
               
            }
         });

      }
   });
});
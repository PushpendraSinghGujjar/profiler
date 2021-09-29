import express from "express";
import SibApiV3Sdk from 'sib-api-v3-sdk';

const router = express.Router();

let defaultClient = SibApiV3Sdk.ApiClient.instance;

let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = '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';



router.get("/getMyAccount",
  (req, res) => {

    let apiInstance = new SibApiV3Sdk.AccountApi();

    apiInstance.getAccount().then(function (data) {
      console.log('API called successfully. Returned data: ' + JSON.stringify(data));
      res.send(data)
    }, function (error) {
      console.error(error);
      res.send(error)
    });
  }
);

router.get("/getCampaignReport",
  (req, res) => {

    let apiInstance = new SibApiV3Sdk.EmailCampaignsApi();
    let campaignId = 1;

    apiInstance.getEmailCampaign(campaignId).then(function (data) {
      console.log('API called successfully. Returned data: ' + JSON.stringify(data));
      res.send(data);
    }, function (error) {
      console.error(error);
      res.send(error);
    });
  }
);

router.get("/getRecepientsList",
  (req, res) => {

    let apiInstance = new SibApiV3Sdk.ContactsApi();

    let opts = {
      'limit': 10,
      'offset': 0
    };
    apiInstance.getLists(opts).then(function (data) {
      console.log('API called successfully. Returned data: ' + data);
      res.send(data);
    }, function (error) {
      console.error(error);
    });
  }
);

router.get("/getListDetails",
  (req, res) => {

    let apiInstance = new SibApiV3Sdk.ContactsApi();

    let listId = 2;

    apiInstance.getList(listId).then(function (data) {
      console.log('API called successfully. Returned data: ' + JSON.stringify(data));
      res.send(data);
    }, function (error) {
      console.error(error);
    });
  }
);

router.get("/getContactsInList",
  (req, res) => {

    let apiInstance = new SibApiV3Sdk.ContactsApi();

    let listId = 3;

    let opts = {
      'modifiedSince': new Date("2021-09-09T19:20:30+01:00"),
      'limit': 50,
      'offset': 0
    };
    apiInstance.getContactsFromList(listId, opts).then(function (data) {
      console.log('API called successfully. Returned data: ' + JSON.stringify(data));
      res.send(JSON.stringify(data));
    }, function (error) {
      console.error(error);
      res.send(error);
    });
  }
);

router.get("/getAllContacts",
  (req, res) => {

    let apiInstance = new SibApiV3Sdk.ContactsApi();

    let opts = {
      'limit': 50,
      'offset': 0,
      // 'modifiedSince': new Date('2021-09-07T19:20:30+01:00') 
    };
    apiInstance.getContacts(opts).then(function (data) {
      console.log('API called successfully. Returned data: ' + JSON.stringify(data));
      res.send(data);
    }, function (error) {
      console.error(error);
    });
  }
);

router.post("/addExistingContactsToList",
  (req, res) => {

    let apiInstance = new SibApiV3Sdk.ContactsApi();

    let listId = 2;

    let contactEmails = new SibApiV3Sdk.AddContactToList();

    contactEmails.emails = ["example@example.com"];

    apiInstance.addContactToList(listId, contactEmails).then(function (data) {
      console.log('API called successfully. Returned data: ' + JSON.stringify(data));
      res.send(data)
    }, function (error) {
      console.error(error);
      res.send(error);
    });
  }
);

router.post("/createContact",
  (req, res) => {

    let apiInstance = new SibApiV3Sdk.ContactsApi();

    let createContact = new SibApiV3Sdk.CreateContact();

    createContact.email = 'example@example.com';
    // createContact.listIds = [2]

    apiInstance.createContact(createContact).then(function (data) {
      console.log('API called successfully. Returned data: ' + JSON.stringify(data));
    }, function (error) {
      console.error(error);
    });
  }
);

router.post("/createDoiContact",
  (req, res) => {

    let apiInstance = new SibApiV3Sdk.ContactsApi();

    let createDoiContact = new SibApiV3Sdk.CreateDoiContact(); // CreateDoiContact | Values to create the Double opt-in (DOI) contact
    
    createDoiContact.email = "pushpendra.singh@oyelabs.com";
    createDoiContact.attributes = {"FNAME":"John","LNAME":"Doe"};
    createDoiContact.includeListIds = [2];
    createDoiContact.templateId = 2;
    createDoiContact.redirectionUrl = "https://admin.zaarol.com";
    
    apiInstance.createDoiContact(createDoiContact).then(function() {
      console.log('API called successfully.');
      res.send("success")
    }, function(error) {
      console.error(error);
      res.send(error);
    });
  }
);


router.post("/createCampaign",
  (req, res) => {

    let apiInstance = new SibApiV3Sdk.EmailCampaignsApi();
    let emailCampaigns = new SibApiV3Sdk.CreateEmailCampaign(); 
    emailCampaigns = {
      tag: 'myTag',
      sender: {name: 'Pushpendra Singh', email: 'pushpendrasingh2306@gmail.com'}, name: 'My First Campaign',
      templateId: 6,
      scheduledAt: new Date("2021-09-25T15:10:00"),
      subject: ' My Java Tutor',
      replyTo: 'pushpendrasingh2306@gmail.com',
      toField: 'Pushpendra Singh',
      recipients: {listIds: [2], exclusionListIds: [3]},
      // attachmentUrl: 'https://images.unsplash.com/photo-1533450718592-29d45635f0a9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8anBnfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      inlineImageActivation: false,
      mirrorActive: false,
      recurring: false,
      type: 'classic',
      header: 'If you are not able to see this mail, click ', 
      footer: 'If you wish to unsubscribe from our newsletter, click ',
      utmCampaign: 'My utm campaign value',
      params: {'PARAMETER': 'My param value' , 'ADDRESS': 'Seattle, WA', 'SUBJECT': 'New Subject'} 
    }
    apiInstance.createEmailCampaign(emailCampaigns).then(function(data) {
      console.log('API called successfully. Returned data: ' + JSON.stringify(data));
      res.send(data);
    }, function(error) {
      console.error(error);
      res.send(error);
    });
  }
);

router.post("/sendImmediateCampaign",
  (req, res) => {

    let apiInstance = new SibApiV3Sdk.EmailCampaignsApi();

let campaignId = 7;

apiInstance.sendEmailCampaignNow(campaignId).then(function() {
  console.log('API called successfully.');
}, function(error) {
  console.error(error);
});
  }
);


router.get("/send",
  (req, res) => {
    res.send("Working");
  }
)


export default router;
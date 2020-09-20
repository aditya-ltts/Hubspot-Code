var prompt = require('prompt')
var request = require('request')
const allForms = [];
const API_KEY = 'f32bd798-d1bb-49ee-8480-a2bbd57c65ad'
const hapikeyParam = `hapikey=${API_KEY}`

// Get all forms Data
function getForms() {
    const finalUrl = `https://api.hubapi.com/forms/v2/forms?${hapikeyParam}`
    request(finalUrl, (error, response, body) => {
        if (error) {
            console.log('error', error)
            throw new Error
        }
        const parsedBody = JSON.parse(body)
        parsedBody.forEach(formData => {
            allForms.push(formData);
        });
        console.log(allForms);
    });
};

// Get a form by its unique ID
function getForm() {
    const formGuid = 'bbaad399-7675-425c-8b05-497565a397bd'
    const finalUrl = `https://api.hubapi.com/forms/v2/forms/${formGuid}/?${hapikeyParam}`
    request(finalUrl, (error, response, body) => {
        if (error) {
            console.log('error', error)
            throw new Error
        }
        const parsedBody = JSON.parse(body)
        console.log(parsedBody);
    });
}

// Get all fields from a form
function getFormFields() {
    const formGuid = 'bbaad399-7675-425c-8b05-497565a397bd'
    const finalUrl = `https://api.hubapi.com/forms/v2/fields/${formGuid}/?${hapikeyParam}`
    request(finalUrl, (error, response, body) => {
        if (error) {
            console.log('error', error)
            throw new Error
        }
        const parsedBody = JSON.parse(body)
        console.log(parsedBody);
    });
}

// Create a new form
function createForm() {
    var options = {
        method: 'POST',
        url: 'https://api.hubapi.com/forms/v2/forms',
        qs: { hapikey: 'f32bd798-d1bb-49ee-8480-a2bbd57c65ad' },
        headers:
        {
            'Content-Type': 'application/json'
        },
        body:
        {
            "name": "DemoForm",
            "action": "",
            "method": "",
            "cssClass": "",
            "redirect": "",
            "submitText": "Submit",
            "followUpId": "",
            "notifyRecipients": "",
            "leadNurturingCampaignId": "",
            "formFieldGroups": [
                {
                    "fields": [
                        {
                            "name": "firstname",
                            "label": "First Name",
                            "type": "string",
                            "fieldType": "text",
                            "description": "",
                            "groupName": "",
                            "displayOrder": 0,
                            "required": false,
                            "selectedOptions": [],
                            "options": [],
                            "validation": {
                                "name": "",
                                "message": "",
                                "data": "",
                                "useDefaultBlockList": false
                            },
                            "enabled": true,
                            "hidden": false,
                            "defaultValue": "",
                            "isSmartField": false,
                            "unselectedLabel": "",
                            "placeholder": ""
                        }
                    ],
                    "default": true,
                    "isSmartGroup": false
                },
                {
                    "fields": [
                        {
                            "name": "lastname",
                            "label": "Last Name",
                            "type": "string",
                            "fieldType": "text",
                            "description": "",
                            "groupName": "",
                            "displayOrder": 1,
                            "required": false,
                            "selectedOptions": [],
                            "options": [],
                            "validation": {
                                "name": "",
                                "message": "",
                                "data": "",
                                "useDefaultBlockList": false
                            },
                            "enabled": true,
                            "hidden": false,
                            "defaultValue": "",
                            "isSmartField": false,
                            "unselectedLabel": "",
                            "placeholder": ""
                        }
                    ],
                    "default": true,
                    "isSmartGroup": false
                },
                {
                    "fields": [
                        {
                            "name": "adress_1",
                            "label": "Adress 1",
                            "type": "string",
                            "fieldType": "text",
                            "description": "",
                            "groupName": "",
                            "displayOrder": 2,
                            "required": false,
                            "selectedOptions": [],
                            "options": [],
                            "validation": {
                                "name": "",
                                "message": "",
                                "data": "",
                                "useDefaultBlockList": false
                            },
                            "enabled": true,
                            "hidden": false,
                            "defaultValue": "",
                            "isSmartField": false,
                            "unselectedLabel": "",
                            "placeholder": ""
                        }
                    ],
                    "default": true,
                    "isSmartGroup": false
                }
            ],
            "createdAt": 1318534279910,
            "updatedAt": 1413919291011,
            "performableHtml": "",
            "migratedFrom": "ld",
            "ignoreCurrentValues": false,
            "metaData": [],
            "deletable": true
        },
        json: true
    };
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(response.statusCode)
    });
}

// Delete a form
function deleteForm() {
    var options = {
        method: 'DELETE',
        url: 'https://api.hubapi.com/forms/v2/forms/28d20cc3-8516-461a-a067-eea3dee4cd34',
        qs: { hapikey: 'f32bd798-d1bb-49ee-8480-a2bbd57c65ad' },
        headers:
        {
            'Content-Type': 'application/json'
        },
        body:
            {},
        json: true
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(response.statusCode);

    });
}

function callMain() {
    prompt.start();
    console.log('Enter the form Action to perform');
    console.log('1. get All Forms Data', '\n', '2. get Form Data based on form guid', '\n', '3. get the Form Fields', '\n',
        '4. Delete a form', '\n', '5. Create a Form', '\n');
    prompt.get(['action'], function (err, result) {
        if (err) { return onErr(err); }
        if (result.action == 1) {
            getForms();
        } else if (result.action == 2) {
            getForm();
        } else if (result.action == 3) {
            getFormFields();
        } else if (result.action == 4) {
            deleteForm();
        } else if (result.action == 5) {
            createForm();
        } else {
            process.exit(1)
        }
    });
}

callMain();
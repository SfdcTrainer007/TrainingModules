import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createAccountRecord from '@salesforce/apex/RecordCreationController.createAccountRecord';

const DEFAULT_SLA_OPTIONS = [
{ label: '--None--', value: 'None' },
{ label: 'Gold', value: 'Gold' },
{ label: 'Silver', value: 'Silver' },
{ label: 'platinum', value: 'platinum' },
{ label: 'Brounze', value: 'Brounze' },
// ... add more options as needed
];
const DEFAULT_SLA_SERIAL_NUMBER_OPTIONS = [
    { label: '--None--', value: 'None' },
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
    { label: '10', value: '10' }
    // ... add more options as needed
];
const DEFAULT_LANGUAGE_OPTIONS = [
    { label: 'English', value: 'en' },
    { label: 'German', value: 'de' },
    { label: 'Spanish', value: 'es' },
    { label: 'French', value: 'fr' },
    { label: 'Italian', value: 'it' },
    { label: 'Japanese', value: 'ja' },
    // Add more languages as needed
];


export default class RecordCreationLWC extends NavigationMixin(LightningElement) {
    
@track accountName = '';
@track contactFirstName = ''; // Track Contact's First Name
@track contactLastName = ''; // Track Contact's Last Name
@track opportunityName = '';
@track sla = '';
@track slaSerialNumber = '';
@track slaExpirationDate = '';
slaOptions = DEFAULT_SLA_OPTIONS;
slaSerialNumberOptions = DEFAULT_SLA_SERIAL_NUMBER_OPTIONS;
languageOptions = DEFAULT_LANGUAGE_OPTIONS;
@track selectedLanguages = [];


handleAccountNameChange(event) {
    this.accountName = event.target.value;
}

handleContactFirstNameChange(event) {
    this.contactFirstName = event.target.value;
}

handleContactLastNameChange(event) {
    this.contactLastName = event.target.value;
}
handleDualListBoxChange(event) {
    this.selectedLanguages = event.detail.value;
}

handleOpportunityNameChange(event) {
    this.opportunityName = event.target.value;
}

handleSlaChange(event) {
    this.sla = event.target.value;
}

handleSlaSerialNumberChange(event) {
    this.slaSerialNumber = event.detail.value;
}



handleSlaExpirationDateChange(event) {
    this.slaExpirationDate = event.target.value;
}

handleCreateRecord() {
    createAccountRecord({
        accountName: this.accountName,
        contactFirstName: this.contactFirstName, // Pass Contact's First Name
        contactLastName: this.contactLastName,   // Pass Contact's Last Name
        opportunityName: this.opportunityName,
        sla: this.sla,
        slaSerialNumber: this.slaSerialNumber,
        slaExpirationDate: this.slaExpirationDate,
    })
        .then((result) => {
            // Navigate to the created Account's detail page and show toast
            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: result, // Id of the created Account
                    objectApiName: 'Account', // API name of the object
                    actionName: 'view'
                }
            });
            const event = new ShowToastEvent({
                title: 'Success',
                message: 'Record has been created successfully.',
                variant: 'success'
            });
            this.dispatchEvent(event);
        })
        .catch(error => {
            console.error('Error creating record:', error);
            // Show an error toast message
            const event = new ShowToastEvent({
                title: 'Error',
                message: 'An error occurred while creating the record.',
                variant: 'error'
            });
            this.dispatchEvent(event);
        });
}

handleCancel() {
    // Clear input fields
    this.accountName = '';
    this.contactFirstName = '';
    this.contactLastName = '';
    this.opportunityName = '';
    this.sla = '';
    this.slaSerialNumber = '';
    this.slaExpirationDate = '';
}
renderedCallback() {
    const dualListBox = this.template.querySelector('lightning-dual-listbox');
    if (dualListBox) {
        dualListBox.options = this.languageOptions;
        dualListBox.value = this.selectedLanguages;
    }
}

get selected() {
    return this.selectedLanguages.length ? this.selectedLanguages : 'none';
}

handleChange(e) {
    this.selectedLanguages = e.detail.value;
}
}
import { LightningElement, track } from 'lwc';
import searchRecords from '@salesforce/apex/CustomLookupController.searchRecords';

export default class CustomLookup extends LightningElement {
    @track accountSearchKey = '';
    @track contactSearchKey = '';
    @track opportunitySearchKey = '';
    @track accountSearchResults = [];
    @track contactSearchResults = [];
    @track opportunitySearchResults = [];

    handleAccountSearchKeyChange(event) {
        this.accountSearchKey = event.target.value;
        this.searchAccounts();
    }

    handleContactSearchKeyChange(event) {
        this.contactSearchKey = event.target.value;
        this.searchContacts();
    }

    handleOpportunitySearchKeyChange(event) {
        this.opportunitySearchKey = event.target.value;
        this.searchOpportunities();
    }

    searchAccounts() {
        if (this.accountSearchKey.length >= 3) {
            searchRecords({ objectName: 'Account', searchTerm: this.accountSearchKey, fields: 'Id, Name' })
                .then(result => {
                    this.accountSearchResults = result;
                })
                .catch(error => {
                    console.error('Error searching accounts:', error);
                });
        } else {
            this.accountSearchResults = [];
        }
    }

    searchContacts() {
        if (this.contactSearchKey.length >= 3) {
            searchRecords({ objectName: 'Contact', searchTerm: this.contactSearchKey, fields: 'Id, LastName' })
                .then(result => {
                    this.contactSearchResults = result;
                })
                .catch(error => {
                    console.error('Error searching contacts:', error);
                });
        } else {
            this.contactSearchResults = [];
        }
    }

    searchOpportunities() {
        if (this.opportunitySearchKey.length >= 3) {
            searchRecords({ objectName: 'Opportunity', searchTerm: this.opportunitySearchKey, fields: 'Id, Name' })
                .then(result => {
                    this.opportunitySearchResults = result;
                })
                .catch(error => {
                    console.error('Error searching opportunities:', error);
                });
        } else {
            this.opportunitySearchResults = [];
        }
    }

    // Rest of your code for handling selection and dispatching events
    handleAccountSearchSelection(event) {
        const selectedId = event.currentTarget.dataset.id;
        const selectedName = this.accountSearchResults.find(result => result.Id === selectedId).Name;
        this.dispatchEvent(new CustomEvent('accountselect', { detail: { selectedId, selectedName } }));
        this.accountSearchKey = '';
        this.accountSearchResults = [];
    }

    handleContactSearchSelection(event) {
        const selectedId = event.currentTarget.dataset.id;
        const selectedName = this.contactSearchResults.find(result => result.Id === selectedId).LastName;
        this.dispatchEvent(new CustomEvent('contactselect', { detail: { selectedId, selectedName } }));
        this.contactSearchKey = '';
        this.contactSearchResults = [];
    }

    handleOpportunitySearchSelection(event) {
        const selectedId = event.currentTarget.dataset.id;
        const selectedName = this.opportunitySearchResults.find(result => result.Id === selectedId).Name;
        this.dispatchEvent(new CustomEvent('opportunityselect', { detail: { selectedId, selectedName } }));
        this.opportunitySearchKey = '';
        this.opportunitySearchResults = [];
    }
    
    // Add selectItem method here
    selectItem(event) {
        const selectedId = event.currentTarget.dataset.id;
        const selectedName = this.searchResults.find(result => result.Id === selectedId).Name;
        const selectedType = event.currentTarget.dataset.type; // Get the selected object type

        this.dispatchEvent(
            new CustomEvent('select', {
                detail: {
                    selectedId: selectedId,
                    selectedName: selectedName,
                    selectedType: selectedType // Pass the selected object type to the event
                }
            })
        );

        this.searchKey = '';
        this.searchResults = [];
    }
}
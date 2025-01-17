import { LightningElement, track} from 'lwc';
import createRecords from '@salesforce/apex/RecordController.createRecords'
export default class createRecordsComponent extends LightningElement {
    @track accountName;
    @track contactFirstName;
    @track contactLastName;
    @track successMessage;
    handleAccountNameChange(event){
        this.accountName = event.target.value;
    }
    handlecontactFirstNameChange(event){
        this.contactFirstName = event.target.value;
    }
    handlecontactLastNameChange(event){
        this.contactLastName = event.target.value;
    }
    handleCreateRecords(){
        createRecords({
            accountName: this.accountName,
            contactFirstName: this.contactFirstName,
            contactLastName: this.contactLastName
        })
        .then(result => {
            this.accountName = '';
            this.contactFirstName = '';
            this.contactLastName = '';
            this.successMessage ='Records created successfully';
            setTimeout(() =>{
                this.successMessage = '';        
            },3000);
            
        })

        .catch(error => {
            console.error('Error creating records:', error);
        });
            
    }
}
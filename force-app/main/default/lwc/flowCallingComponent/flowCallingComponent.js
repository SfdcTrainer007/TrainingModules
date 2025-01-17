import { LightningElement, api, track } from 'lwc';

export default class FlowButtonComponent extends LightningElement {
    @api showSubmitButton; // Receive the visibility property from parent
    @track flowVisible = false;
    @track flowApiName = 'Get_Opportunity_Amount_List'; // Replace with your Flow's API name

    connectedCallback() {
        this.addEventListener('filelistupdate', this.handleFileListUpdate.bind(this));
    }

    handleButtonClick() {
        this.flowVisible = true; // Show the flow
    }

    handleStatusChange(event) {
        if (event.detail.status === 'FINISHED') {
            this.flowVisible = false; // Hide the flow after completion
        }
    }

    handleFileListUpdate(event) {
        this.showSubmitButton = event.detail.showSubmitButton;
    }
}
import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class FileUploadWithSubmitButton extends LightningElement {
    @api recordId;
    @track files = [];
    @track currentFiles = [];
    @track showSubmitButton = false;
    @track currentPage = 1;
    @track pageSize = 5;
    @track flowVisible = false;
    @track flowApiName = 'Get_Opportunity_Amount_List'; // Replace with your Flow's API name

    get totalPages() {
        return Math.ceil(this.files.length / this.pageSize);
    }

    get isPreviousDisabled() {
        return this.currentPage === 1;
    }

    get isNextDisabled() {
        return this.currentPage >= this.totalPages;
    }

    connectedCallback() {
        this.loadFilesFromStorage();
        this.updateCurrentFiles();
    }

    handleUploadFinished(event) {
        const uploadedFiles = event.detail.files;
        uploadedFiles.forEach(file => {
            this.files.push({ id: file.documentId, name: file.name });
        });
        this.updateSubmitButtonVisibility();
        this.saveFilesToStorage();
        this.updateCurrentFiles();
    }

    handleFileDelete(event) {
        const fileId = event.target.dataset.id;
        this.files = this.files.filter(file => file.id !== fileId);
        this.updateSubmitButtonVisibility();
        this.saveFilesToStorage();
        this.updateCurrentFiles();
    }

    handleFilePreview(event) {
        const fileId = event.target.dataset.id;
        window.open(`/sfc/servlet.shepherd/document/download/${fileId}`, '_blank');
    }

    handleFileDownload(event) {
        const fileId = event.target.dataset.id;
        window.open(`/sfc/servlet.shepherd/document/download/${fileId}`, '_blank');
    }

    handlePreviousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.updateCurrentFiles();
        }
    }

    handleNextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.updateCurrentFiles();
        }
    }

    updateCurrentFiles() {
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        this.currentFiles = this.files.slice(start, end);
    }

    updateSubmitButtonVisibility() {
        this.showSubmitButton = this.files.length > 0;
    }

    saveFilesToStorage() {
        localStorage.setItem('files', JSON.stringify(this.files));
    }

    loadFilesFromStorage() {
        const storedFiles = localStorage.getItem('files');
        if (storedFiles) {
            this.files = JSON.parse(storedFiles);
            this.updateSubmitButtonVisibility();
            this.updateCurrentFiles();
        }
    }

    handleButtonClick() {
        this.flowVisible = true; // Show the modal
    }

    handleCloseModal() {
        this.flowVisible = false; // Hide the modal
    }

    handleStatusChange(event) {
        if (event.detail.status === 'FINISHED') {
            this.flowVisible = false; // Hide the Flow component after it finishes
            this.showToast('Flow Completed', 'The flow has completed successfully.', 'success');
        }
    }

    showToast(title, message, variant) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(evt);
    }
}
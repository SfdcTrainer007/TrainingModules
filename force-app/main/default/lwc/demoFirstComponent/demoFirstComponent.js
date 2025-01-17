import { LightningElement, track } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import createContact from "@salesforce/apex/AccountCreationController.createContact";

export default class LdsCreateContact extends LightningElement {
  @track contactId;
  firstName = "";
  lastName = "";

  handleFirstNameChange(event) {
    this.contactId = undefined;
    this.firstName = event.target.value;
  }

  handleLastNameChange(event) {
    this.contactId = undefined;
    this.lastName = event.target.value;
  }

  createContact() {
    const fields = {};
    fields["FirstName"] = this.firstName;
    fields["LastName"] = this.lastName;

    createContact({ firstName: this.firstName, lastName: this.lastName })
      .then((result) => {
        if (result === "success") {
          this.dispatchEvent(
            new ShowToastEvent({
              title: "Success",
              message: "Contact created",
              variant: "success",
            })
          );
          this.contactId = ""; // Clear the input after success
        } else {
          this.dispatchEvent(
            new ShowToastEvent({
              title: "Error creating record",
              message: "An error occurred while creating the contact",
              variant: "error",
            })
          );
        }
      })
      .catch((error) => {
        this.dispatchEvent(
          new ShowToastEvent({
            title: "Error creating record",
            message: error.body.message,
            variant: "error",
          })
        );
      });
  }
}
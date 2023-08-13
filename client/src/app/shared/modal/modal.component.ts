import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  @Input() isShown!: boolean;
  @Input() name!: string;
  @Output() closeModal: EventEmitter<any> = new EventEmitter<boolean>();
  @Output() confirmDelete: EventEmitter<void> = new EventEmitter<void>();

  isDeleted: boolean = false;

  // Method to close the modal and emit the updated value back to the parent component
  close() {
    this.isShown = false; // Update the isShown variable in the child component
    this.closeModal.emit(this.isShown); // Emit the updated value to the parent component
    this.closeModal.emit(this.isDeleted); // Emit the updated value to the parent component
  }

  deleteConfirm() {
    this.confirmDelete.emit(); // Emit the event to confirm the delete operation
    this.close(); // Close the modal after confirming delete
  }
}

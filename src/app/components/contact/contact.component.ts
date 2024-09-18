import { Component, inject } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { TranslationService } from '../../services/translation.service';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [MatSlideToggleModule, CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  private translationService = inject(TranslationService);

  constructor(private contactService: ContactService) {}

  formData = {
    name: '',
    email: '',
    message: ''
  };

  onSubmit() {
    console.log('Form submitted', this.formData);
    // Here you would typically send the form data to a server
    // For now, we'll just log it to the console
    alert('Message sent! (This is a demo)');
    this.formData = { name: '', email: '', message: '' };
  }

  translate(key: string): string {
    return this.translationService.translate(key);
  }

  sendEmail() {
    const emailData = {
      sendto: 'arkrater@gmail.com',
      name: this.formData.name,
      replyTo: this.formData.email,
      ishtml: 'false',
      title: 'Nuevo mensaje de contacto',
      body: this.formData.message + '\n\n' + 'De: ' + this.formData.email,
    };

    this.contactService.sendEmail(emailData).subscribe({
        next: (v) => console.log(v),
        error: (e) => console.error(e),
        complete: () => console.info('complete') 
    });    
  }
}

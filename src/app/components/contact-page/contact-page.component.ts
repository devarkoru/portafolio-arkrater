import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { staggerPersonalTransition } from '../../../route-transition';
import { TranslationService } from '../../services/translation.service';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact.service';


@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  animations: [staggerPersonalTransition],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.css'
})
export class ContactPageComponent {

  private translationService = inject(TranslationService);
  private contactService = inject(ContactService);

  name: string = '';
  email: string = '';
  message: string = '';

  translate(key: string): string {
    return this.translationService.translate(key);
  }

  onSubmit() {
    console.log('Enviando mensaje...', { name: this.name, email: this.email, message: this.message });
    
    const emailData = {
      sendto: 'arkrater@gmail.com',
      name: this.name,
      replyTo: this.email,
      ishtml: 'false',
      title: 'Nuevo mensaje de contacto',
      body: this.message + '\n\n' + 'De: ' + this.email,
    };

    this.contactService.sendEmail(emailData).subscribe({
      next: (v) => {
        console.log(v);
        alert('¡Mensaje enviado con éxito! / Message sent successfully!');
        // Reset form fields after submission
        this.name = '';
        this.email = '';
        this.message = '';
      },
      error: (e) => {
        console.error(e);
        alert('Error al enviar el mensaje. Inténtelo más tarde. / Error sending message. Please try again later.');
      }
    });
  }

}

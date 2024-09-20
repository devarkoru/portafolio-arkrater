import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { staggerPersonalTransition } from '../../../route-transition';
import { TranslationService } from '../../services/translation.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  animations: [staggerPersonalTransition],
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.css'
})
export class PersonalComponent {

  private translationService = inject(TranslationService);

  name: string = '';
  email: string = '';
  message: string = '';

  translate(key: string): string {
    return this.translationService.translate(key);
  }

  onSubmit() {
    // Here you would typically send the form data to a server
    console.log('Form submitted', { name: this.name, email: this.email, message: this.message });
    // Reset form fields after submission
    this.name = '';
    this.email = '';
    this.message = '';
    // You could also show a success message to the user here
  }

}

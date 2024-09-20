import { Component, inject, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { TranslationService } from '../../services/translation.service';
import { AboutComponent } from "../about/about.component";
import { GalleryComponent } from "../gallery/gallery.component";
import { ContactComponent } from "../contact/contact.component";

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [MatSlideToggleModule, CommonModule, FormsModule, AboutComponent, GalleryComponent, ContactComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  private translationService = inject(TranslationService);
  
  translate(key: string): string {
    return this.translationService.translate(key);
  }
}

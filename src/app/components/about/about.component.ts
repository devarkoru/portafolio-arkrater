import { Component, inject } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { NgOptimizedImage, NgStyle } from '@angular/common'


@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NgOptimizedImage, NgStyle],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  private translationService = inject(TranslationService);
  
  translate(key: string): string {
    return this.translationService.translate(key);
  }
}

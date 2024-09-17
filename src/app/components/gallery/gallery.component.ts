import { Component, inject, NgModule } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [MatSlideToggleModule, CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {
  projects = [
    { name: 'Retro Game', description: 'A classic arcade-style game', link: '#' },
    { name: 'Synth Wave', description: 'Music player with retro vibes', link: '#' },
    { name: 'Pixel Art', description: 'Create your own pixel masterpiece', link: '#' },
    { name: 'Time Machine', description: 'Travel through digital decades', link: '#' },
    { name: 'Cyber Chat', description: 'Retro-styled chat application', link: '#' },
    { name: 'Neon Dreams', description: 'Visual experiments with neon', link: '#' }
  ];
}

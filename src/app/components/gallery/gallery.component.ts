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
  private translationService = inject(TranslationService);
  
  projects = [
    { image: 'https://media1.tenor.com/m/Z0IZ_YWXD3wAAAAC/sett-league-of-legends.gif', name: 'Retro Game', description: 'A classic arcade-style game', link: '#' },
    { image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Sett_1.jpg', name: 'Synth Wave', description: 'Music player with retro vibes', link: '#' },
    { image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Sett_9.jpg', name: 'Pixel Art', description: 'Create your own pixel masterpiece', link: '#' },
    { image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Sett_10.jpg', name: 'Time Machine', description: 'Travel through digital decades', link: '#' },
    { image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Sett_19.jpg', name: 'Cyber Chat', description: 'Retro-styled chat application', link: '#' },
    { image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Sett_38.jpg', name: 'Neon Dreams', description: 'Visual experiments with neon', link: '#' }
  ];

  

  translate(key: string): string {
    return this.translationService.translate(key);
  }
}

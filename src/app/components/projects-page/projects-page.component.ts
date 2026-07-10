import { Component, inject } from '@angular/core';
import { staggerProjectTransition } from '../../../route-transition';
import { TranslationService } from '../../services/translation.service';
import { CommonModule } from '@angular/common';

interface CarouselProject {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  itchIoLink: string;
}

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [CommonModule],
  animations: [staggerProjectTransition],
  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.css'
})


export class ProjectsPageComponent {

  private translationService = inject(TranslationService);

  projects: CarouselProject[] = [
    {
      id: 1,
      imageUrl: '/images/retro_platformer.png',
      title: 'Retro Platformer',
      description: 'A classic platformer game with pixel-perfect graphics and challenging levels.',
      itchIoLink: 'https://itch.io/game/retro-platformer'
    },
    {
      id: 2,
      imageUrl: '/images/space_invaders.png',
      title: 'Space Invaders Reloaded',
      description: 'A modern take on the iconic Space Invaders game with new power-ups and enemies.',
      itchIoLink: 'https://itch.io/game/space-invaders-reloaded'
    },
    {
      id: 3,
      imageUrl: '/images/neon_racer.png',
      title: 'Neon Racer',
      description: 'High-speed racing game set in a neon-lit cyberpunk world.',
      itchIoLink: 'https://itch.io/game/neon-racer'
    },
    {
      id: 4,
      imageUrl: '/images/dungeon_crawler.png',
      title: 'Dungeon Crawler',
      description: 'Explore procedurally generated dungeons in this roguelike adventure.',
      itchIoLink: 'https://itch.io/game/dungeon-crawler'
    },
    {
      id: 5,
      imageUrl: '/images/pixel_rpg.png',
      title: 'Pixel Art RPG',
      description: 'An epic role-playing game with charming pixel art graphics and a deep storyline.',
      itchIoLink: 'https://itch.io/game/pixel-art-rpg'
    }
  ];

  currentIndex = 0;

  ngOnInit() {
    setInterval(() => this.nextSlide(), 5000); // Auto-advance every 5 seconds
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.projects.length) % this.projects.length;
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.projects.length;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }

  translate(key: string): string {
    return this.translationService.translate(key);
  }
}

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
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  animations: [staggerProjectTransition],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})


export class SkillsComponent {

  private translationService = inject(TranslationService);

  projects: CarouselProject[] = [
    {
      id: 1,
      imageUrl: 'https://media1.tenor.com/m/Z0IZ_YWXD3wAAAAC/sett-league-of-legends.gif',
      title: 'Retro Platformer',
      description: 'A classic platformer game with pixel-perfect graphics and challenging levels.',
      itchIoLink: 'https://itch.io/game/retro-platformer'
    },
    {
      id: 2,
      imageUrl: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Sett_1.jpg',
      title: 'Space Invaders Reloaded',
      description: 'A modern take on the iconic Space Invaders game with new power-ups and enemies.',
      itchIoLink: 'https://itch.io/game/space-invaders-reloaded'
    },
    {
      id: 3,
      imageUrl: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Sett_9.jpg',
      title: 'Neon Racer',
      description: 'High-speed racing game set in a neon-lit cyberpunk world.',
      itchIoLink: 'https://itch.io/game/neon-racer'
    },
    {
      id: 4,
      imageUrl: 'https://media1.tenor.com/m/Z0IZ_YWXD3wAAAAC/sett-league-of-legends.gif',
      title: 'Dungeon Crawler',
      description: 'Explore procedurally generated dungeons in this roguelike adventure.',
      itchIoLink: 'https://itch.io/game/dungeon-crawler'
    },
    {
      id: 5,
      imageUrl: 'https://media1.tenor.com/m/Z0IZ_YWXD3wAAAAC/sett-league-of-legends.gif',
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

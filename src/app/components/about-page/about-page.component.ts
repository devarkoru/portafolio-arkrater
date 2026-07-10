import { Component, inject } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { CommonModule } from '@angular/common';
import { staggerAboutTransition, staggerEducationTransition, staggerTransition } from '../../../route-transition';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [CommonModule],
  animations: [staggerTransition, staggerEducationTransition, staggerAboutTransition],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.css'
})
export class AboutPageComponent {
  private translationService = inject(TranslationService);

  
  
  translate(key: string): string {
    return this.translationService.translate(key);
  }

  experiences = [
    {
      id: 1,
      year: 'Jun 2025 - Present',
      company: 'KDU Ingeniería',
      position: 'Senior Fullstack Developer',
      descriptionKey: 'experience.kdu.description',
      technologies: 'Java, PostgreSQL, Angular 21+, AWS, Docker, Snowflake, Spring Batch'
    },
    {
      id: 2,
      year: 'Sep 2024 - Jun 2025',
      company: 'Scotiabank',
      position: 'Backend Developer',
      descriptionKey: 'experience.scotiabank.description',
      technologies: 'Java, SQL Server, React'
    },
    {
      id: 3,
      year: 'Apr 2023 - Sep 2024',
      company: 'Klap',
      position: 'Backend Developer',
      descriptionKey: 'experience.klap.description',
      technologies: 'Java, PostgreSQL'
    },
    {
      id: 4,
      year: 'Feb 2022 - Mar 2023',
      company: 'SII Group',
      position: 'Fullstack Developer',
      descriptionKey: 'experience.siigroup.description',
      technologies: 'Java, Spring Boot, Angular, Magento, JavaScript'
    },
    {
      id: 5,
      year: 'Aug 2021 - Jan 2022',
      company: '3IT',
      position: 'Fullstack Developer',
      descriptionKey: 'experience.3it.description',
      technologies: 'Angular, Git, Sonar, Bamboo'
    },
    {
      id: 6,
      year: '2016 - 2021',
      company: 'SONDA / INNOVAGROUP / AEURUS',
      position: 'Java Developer / Consultant',
      descriptionKey: 'experience.consulting.description',
      technologies: 'Java, Angular, Oracle, Spring Boot, Siebel'
    }
  ];

  get timelineWidth(): string {
    return `${this.experiences.length * 320}px`;
  }

  educationList = [
    {
      id: 1,
      year: '2014 - 2016',
      institution: 'Duoc UC',
      degree: 'Programmer Analyst',
      descriptionKey: ''
    },
    {
      id: 2,
      year: '2019 - 2020',
      institution: 'Duoc UC',
      degree: 'Engineer in Computer Science',
      descriptionKey: ''
    },
    {
      id: 3,
      year: '2022',
      institution: 'Coderhouse',
      degree: 'Video Game Development',
      descriptionKey: 'Unity, C#, 3D, 2D'
    },
    {
      id: 4,
      year: '2021',
      institution: 'Udemy',
      degree: 'Video Game Development',
      descriptionKey: 'Unity, C#, 3D'
    }
  ];

  // Descarga el PDF directamente
  downloadPDF(): void {
    console.log('Descargando CV PDF...');
    const link = document.createElement('a');
    link.href = '/CV - Claudio Nunez Oyarzun.pdf';
    link.download = 'CV - Claudio Nunez Oyarzun.pdf';
    link.click();
  }

  // Abre el CV HTML en una nueva pestaña
  viewHTML(): void {
    window.open('/cv.html', '_blank');
  }


}

import { Component, inject } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { FileReaderService } from '../../services/file-reader.service';
import { CommonModule } from '@angular/common';
import { staggerAboutTransition, staggerEducationTransition, staggerTransition } from '../../../route-transition';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  animations: [staggerTransition, staggerEducationTransition, staggerAboutTransition],
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})
export class EducationComponent {
  private translationService = inject(TranslationService);
  private fileReaderService = inject(FileReaderService);
  pdfContent: string | null = null;

  
  
  translate(key: string): string {
    return this.translationService.translate(key);
  }

  experiences = [
    {
      id: 1,
      year: '2024 - Present',
      company: 'Scotiabank',
      position: 'Senior Developer',
      descriptionKey: 'Java, Springboot, SQL Server, React'
    },
    {
      id: 2,
      year: '2023 - 2024',
      company: 'Klap',
      position: 'Backend Developer',
      descriptionKey: 'Java, PostgreSQL'
    },
    {
      id: 3,
      year: '2022 - 2023',
      company: 'SII Group',
      position: 'Fullstack Developer',
      descriptionKey: 'Java, Springboot, Oracle, Angular'
    },
    {
      id: 4,
      year: '2021 - 2022',
      company: '3IT',
      position: 'Fullstack Developer',
      descriptionKey: 'Angular'
    },
    {
      id: 5,
      year: '2020 - 2021',
      company: 'SONDA',
      position: 'Software Engineer',
      descriptionKey: 'Java'
    },
    {
      id: 6,
      year: '2019 - 2020',
      company: 'INNOVA Group',
      position: 'Semi Senior Consultant',
      descriptionKey: 'Java, Springboot, Oracle, Angular'
    },
    {
      id: 7,
      year: '2018 - 2019',
      company: 'Aeurus',
      position: 'Software Developer',
      descriptionKey: 'Java, MySQL'
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

  // Comprueba si existe el archivo y luego descarga el PDF
  checkFileAndDownload(): void {
    console.log('Descargando CV...');
    const filePath = '/assets/cv.txt';  // Ruta del archivo en assets

        this.pdfContent = this.fileReaderService.pdfText;
        this.downloadPDF();
      };

  // Convierte el contenido Base64 en un archivo PDF y lo descarga
  downloadPDF(): void {
    if (this.pdfContent) {
      const base64Data = this.pdfContent;
      const binary = atob(base64Data);
      const array = [];

      for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }

      const blob = new Blob([new Uint8Array(array)], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'CV.pdf';
      link.click();
    }
  }


}

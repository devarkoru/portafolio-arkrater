import { Component, inject } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { CommonModule } from '@angular/common';
import { staggerEducationTransition, staggerTransition } from '../../../route-transition';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  animations: [staggerTransition, staggerEducationTransition],
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})
export class EducationComponent {
  private translationService = inject(TranslationService);
  
  translate(key: string): string {
    return this.translationService.translate(key);
  }

  experiences = [
    {
      id: 1,
      year: '2022 - Present',
      company: 'TechCorp',
      position: 'Senior Developer',
      descriptionKey: 'experience.techcorp.description'
    },
    {
      id: 2,
      year: '2019 - 2022',
      company: 'InnoSoft',
      position: 'Full Stack Developer',
      descriptionKey: 'experience.innosoft.description'
    },
    {
      id: 3,
      year: '2017 - 2019',
      company: 'WebSolutions',
      position: 'Junior Developer',
      descriptionKey: 'experience.websolutions.description'
    },
    {
      id: 4,
      year: '2015 - 2017',
      company: 'TechSolutions',
      position: 'Intern',
      descriptionKey: 'experience.techsolutions.description'
    },
    {
      id: 5,
      year: '2013 - 2015',
      company: 'TechSupport',
      position: 'Intern',
      descriptionKey: 'experience.techsupport.description'
    },
    {
      id: 6,
      year: '2011 - 2013',
      company: 'TechSupport',
      position: 'Intern',
      descriptionKey: 'experience.techsupport.description'
    },
    {
      id: 7,
      year: '2009 - 2011',
      company: 'TechSupport',
      position: 'Intern',
      descriptionKey: 'experience.techsupport.description'
    },
    {
      id: 8,
      year: '2007 - 2009',
      company: 'TechSupport',
      position: 'Intern',
      descriptionKey: 'experience.techsupport.description'
    }

  ];

  get timelineWidth(): string {
    return `${this.experiences.length * 320}px`;
  }

  educationList = [
    {
      id: 1,
      year: '2013 - 2017',
      institution: 'Tech University',
      degree: 'Bachelor of Science in Computer Science',
      descriptionKey: 'education.bsc.description'
    },
    {
      id: 2,
      year: '2017 - 2019',
      institution: 'Advanced Institute of Technology',
      degree: 'Master of Science in Software Engineering',
      descriptionKey: 'education.msc.description'
    },
    {
      id: 3,
      year: '2020',
      institution: 'Online Learning Platform',
      degree: 'Certificate in AI and Machine Learning',
      descriptionKey: 'education.certificate.description'
    },
    {
      id: 4,
      year: '2021',
      institution: 'Online Learning Platform',
      degree: 'Certificate in Blockchain Technology',
      descriptionKey: 'education.certificatee.description'
    }
  ];
}

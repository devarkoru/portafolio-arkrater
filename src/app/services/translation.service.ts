import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor() { }

  private languageSubject = new BehaviorSubject<string>('en');
  language$ = this.languageSubject.asObservable();

  setLanguage(lang: string) {
    this.languageSubject.next(lang);
  }

  translate(key: string): string {
    const translations: { [lang: string]: { [key: string]: string } } = {
      en: {
        'home': 'Home',
        'about': 'About',
        'projects': 'Projects',
        'contact': 'Contact',
        'hero.title': 'Welcome to the Retro Future',
        'hero.subtitle': 'Where the past meets tomorrow\'s technology',
        // Add more translations as needed
        // ... existing translations ...
        'about.title': 'About Me',
        'about.paragraph1': 'Greetings, digital explorer! I\'m a retro-futuristic developer, blending the aesthetics of the past with the technologies of tomorrow. My passion lies in creating unique digital experiences that transport users to a world where neon dreams and pixelated realities collide.',
        'about.paragraph2': 'With a keyboard as my synthesizer and code as my melody, I compose digital symphonies that resonate across the cybernetic frontier. Join me on this exciting journey as we push the boundaries of what\'s possible in the digital realm!',
        'about.skill.retroDesign': 'Retro Design',
        'about.portraitAlt': 'Retro-style portrait of the developer',
      },
      es: {
        'home': 'Inicio',
        'about': 'Acerca',
        'projects': 'Proyectos',
        'contact': 'Contacto',
        'hero.title': 'Bienvenido al Futuro Retro',
        'hero.subtitle': 'Donde el pasado se encuentra con la tecnología del mañana',
        // Add more translations as needed
        // ... existing translations ...
        'about.title': 'Sobre Mí',
        'about.paragraph1': '¡Saludos, explorador digital! Soy un desarrollador retro-futurista, mezclando la estética del pasado con las tecnologías del mañana. Mi pasión radica en crear experiencias digitales únicas que transportan a los usuarios a un mundo donde los sueños de neón y las realidades pixeladas colisionan.',
        'about.paragraph2': 'Con un teclado como mi sintetizador y el código como mi melodía, compongo sinfonías digitales que resuenan a través de la frontera cibernética. ¡Únete a mí en este emocion ante viaje mientras empujamos los límites de lo posible en el reino digital!',
        'about.skill.retroDesign': 'Diseño Retro',
        'about.portraitAlt': 'Retrato estilo retro del desarrollador',
      }
    };
    return translations[this.languageSubject.value as 'en' | 'es'][key] || key;    
  }
  
}

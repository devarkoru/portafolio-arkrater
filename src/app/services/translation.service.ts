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
        'about': 'About me',
        'projects': 'Projects',
        'contact': 'Contact',
        'hero.title': 'Welcome to my personal website',
        'hero.subtitle': 'and check out my project portfolio',
        'hero.explore': 'Go explore',
        // Add more translations as needed
        // ... existing translations ...
        'about.title': 'About Me',
        'about.paragraph1': 'Greetings! I am a programmer with over 6 years of experience in software development, web applications, and environment setup. Throughout my career, I have demonstrated a commitment to achieving goals and creating a pleasant and collaborative work environment.',
        'about.paragraph2': 'I have also had the opportunity to be a technical leader in application development, which has allowed me to integrate into new companies and work with other high-level professionals. I am passionate about teamwork and have the ability to face new challenges with determination, always focused on the same goal shared with my colleagues.',
        'about.skill.retroDesign': 'Retro Design',
        'about.portraitAlt': 'Retro-style portrait of the developer',        
        'projects.title': 'My Projects',
        'projects.viewProject': 'View Project',
        'projects.project1.title': 'Neon Nights',
        'projects.project1.description': 'A cyberpunk-inspired web application',
        'projects.project2.title': 'Pixel Perfect',
        'projects.project2.description': 'A retro game development framework',
        'projects.project3.title': 'Synthwave Synth',
        'projects.project3.description': 'An online synthesizer with 80s vibes',
        'projects.project4.title': 'Time Warp',
        'projects.project4.description': 'A nostalgic social media platform',
        'contact.title': 'Contact Me',
        'contact.name': 'Name',
        'contact.email': 'Email',
        'contact.message': 'Message',
        'contact.send': 'Send',
        'contact.touch': 'Get in touch',
        'contact.subtitle': 'Have a question or comment? Drop me a line!',
        'contact.phone': 'Phone',
        'contact.location': 'Location',
      },
      es: {
        'home': 'Inicio',
        'about': 'Sobre mí',
        'projects': 'Proyectos',
        'contact': 'Contacto',
        'hero.title': 'Bienvenidos a mi sitio web personal',
        'hero.subtitle': 'y visita mi portafolio de proyectos',
        'hero.explore': 'Ir a ver',
        // Add more translations as needed
        // ... existing translations ...
        'about.title': 'Sobre Mí',
        'about.paragraph1': '¡Saludos! Soy un programador con más de 6 años de experiencia en desarrollo de software, aplicaciones web y levantamiento de ambientes. Durante mi carrera, he demostrado ser un profesional comprometido con el logro de objetivos y con la creación de un ambiente laboral agradable y colaborativo.',
        'about.paragraph2': ' Además, he tenido la oportunidad de ser líder técnico en el desarrollo de aplicaciones, lo que me ha permitido integrarme en nuevas empresas y trabajar con otros profesionales de alto nivel. Me apasiona trabajar en equipo y tengo la capacidad de enfrentar nuevos desafíos con determinación, siempre enfocado en el mismo objetivo compartido con mis compañeros',
        'about.skill.retroDesign': 'Diseño Retro',
        'about.portraitAlt': 'Retrato estilo retro del desarrollador',
        'projects.title': 'Mis Proyectos',
        'projects.viewProject': 'Ver Proyecto',
        'projects.project1.title': 'Noches de Neón',
        'projects.project1.description': 'Una aplicación web inspirada en el cyberpunk',
        'projects.project2.title': 'Pixel Perfecto',
        'projects.project2.description': 'Un framework para desarrollo de juegos retro',
        'projects.project3.title': 'Sintetizador Synthwave',
        'projects.project3.description': 'Un sintetizador en línea con vibras de los 80',
        'projects.project4.title': 'Viaje en el Tiempo',
        'projects.project4.description': 'Una plataforma de redes sociales nostálgica',
        'contact.title': 'Contáctame',
        'contact.name': 'Nombre',
        'contact.email': 'Correo Electrónico',
        'contact.message': 'Mensaje',
        'contact.send': 'Enviar',
        'contact.touch': 'Ponte en contacto',
        'contact.subtitle': '¿Tienes alguna pregunta o comentario? ¡Escríbeme!',
        'contact.phone': 'Teléfono',
        'contact.location': 'Ubicación',
      }
    };
    return translations[this.languageSubject.value as 'en' | 'es'][key] || key;    
  }
  
}

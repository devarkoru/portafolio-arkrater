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
        'about.paragraph1': 'Greetings! I am a programmer with over 8 years of experience in software development, web applications, and environment setup. Throughout my career, I have demonstrated a commitment to achieving goals and creating a pleasant and collaborative work environment.',
        'about.paragraph2': 'I have also had the opportunity to be a technical leader in application development, which has allowed me to integrate into new companies and work with other high-level professionals. I am passionate about teamwork and have the ability to face new challenges with determination, always focused on the same goal shared with my colleagues.',
        'about.paragraphsub1': 'I am a programmer with over 8 years of experience in software development, web applications, and environment setup. Throughout my career, I have demonstrated a commitment to achieving goals and creating a pleasant and collaborative work environment.',
        'about.paragraphsub2': 'I have also had the opportunity to be a technical leader in application development, which has allowed me to integrate into new companies and work with other high-level professionals.',
        'about.paragraphsub3': 'I am passionate about teamwork and have the ability to face new challenges with determination, always focused on the same goal shared with my colleagues.',
        'about.downloadResume': 'Download Resume',
        'about.viewResumeHtml': 'View HTML Resume',
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
        'contact.message': 'Have a question or want to work together? Drop me a line!',
        'contact.send': 'Send',
        'contact.touch': 'Get in touch',
        'contact.subtitle': 'Have a question or comment? Drop me a line!',
        'contact.phone': 'Phone',
        'contact.location': 'Location',
        'contact.messageLabel': 'Message',
        'contact.submit': 'Send Message',
        'experience.title': 'Professional Experience',
        'experience.kdu.description': 'Active participation in requirements gathering and developing enhancements for transactional service projects. Resolving production incidents and optimizing existing systems.',
        'experience.scotiabank.description': 'Development and continuous improvement of internal bank projects and services, ensuring application quality and stability.',
        'experience.klap.description': 'Development and optimization of high-traffic merchant acquiring and transactional services. Advanced technical support to clients, reducing incident resolution times.',
        'experience.siigroup.description': 'Planning, requirements gathering, and development of agile projects for the banking sector. Refactoring legacy code to modern standards for the international banking sector.',
        'experience.3it.description': 'Migration of internal applications from AngularJS to Angular 11, improving maintainability.',
        'experience.consulting.description': 'Previous projects as Consultant and Developer for the transport, public, and retail sectors, implementing enterprise solutions (Java, Angular, Oracle, Siebel).',
        'education.title': 'Education',
        'education.bsc.description': 'Studied fundamental computer science concepts and software development practices.',
        'education.msc.description': 'Focused on advanced software engineering principles and project management.',
        'education.certificate.description': 'Explored machine learning algorithms and artificial intelligence applications.',
        'carousel.title': 'Featured Projects',
        'carousel.playOnItchIo': 'Play on itch.io',
        'footer.title': 'Copyright © ',
        'footer.title2': ' - All Rights Reserved',
        'footer.message': 'Made with ❤️ by the Development Team',
        'arcade.insertCoin': 'Insert Coin / Exit',
        'arcade.score': 'Score',
        'arcade.highScore': 'High Score',
        'arcade.playAgain': 'Play Again',
        'arcade.controls': 'Controls: Click / Tap / Keyboard',
        'arcade.synthTitle': 'Synth Wave Synthesizer',
        'arcade.pixelTitle': 'Retro Pixel Art Grid',
        'arcade.terminalPlaceholder': 'Type help, about, clear, hello, joke...',
        'arcade.clear': 'Clear Grid',
        'arcade.download': 'Download Art',
        'arcade.particlesTitle': 'Neon Particle Generator',

        
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
        'about.paragraph1': '¡Saludos! Soy un programador con más de 8 años de experiencia en desarrollo de software, aplicaciones web y levantamiento de ambientes. Durante mi carrera, he demostrado ser un profesional comprometido con el logro de objetivos y con la creación de un ambiente laboral agradable y colaborativo.',
        'about.paragraph2': ' Además, he tenido la oportunidad de ser líder técnico en el desarrollo de aplicaciones, lo que me ha permitido integrarme en nuevas empresas y trabajar con otros profesionales de alto nivel. Me apasiona trabajar en equipo y tengo la capacidad de enfrentar nuevos desafíos con determinación, siempre enfocado en el mismo objetivo compartido con mis compañeros',
        'about.paragraphsub1': 'Soy un programador con más de 8 años de experiencia en desarrollo de software, aplicaciones web y levantamiento de ambientes. Durante mi carrera, he demostrado ser un profesional comprometido con el logro de objetivos y con la creación de un ambiente laboral agradable y colaborativo.',
        'about.paragraphsub2': 'Además, he tenido la oportunidad de ser líder técnico en el desarrollo de aplicaciones, lo que me ha permitido integrarme en nuevas empresas y trabajar con otros profesionales de alto nivel.',
        'about.paragraphsub3': ' Me apasiona trabajar en equipo y tengo la capacidad de enfrentar nuevos desafíos con determinación, siempre enfocado en el mismo objetivo compartido con mis compañeros.',
        'about.downloadResume': 'Descarga mi Currículum',
        'about.viewResumeHtml': 'Ver Currículum HTML',
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
        'contact.message': '¿Tienes una pregunta o quieres trabajar juntos? ¡Escríbeme!',
        'contact.send': 'Enviar',
        'contact.touch': 'Ponte en contacto',
        'contact.subtitle': '¿Tienes alguna pregunta o comentario? ¡Escríbeme!',
        'contact.phone': 'Teléfono',
        'contact.location': 'Ubicación',
        'contact.messageLabel': 'Mensaje',
        'contact.submit': 'Enviar Mensaje',
        // ... existing translations ...
        'experience.title': 'Experiencia Profesional',
        'experience.kdu.description': 'Participación activa en el levantamiento de requerimientos y desarrollo de mejoras para proyectos de servicios del sector transaccional. Resolución de incidentes en producción y optimización de los sistemas existentes.',
        'experience.scotiabank.description': 'Desarrollo y mejora continua de proyectos y servicios internos del banco, asegurando la calidad y estabilidad de las aplicaciones.',
        'experience.klap.description': 'Desarrollo y optimización de servicios de adquirencia y transaccionales de alto tráfico. Soporte técnico avanzado a clientes, reduciendo tiempos de resolución de incidentes.',
        'experience.siigroup.description': 'Planificación, levantamiento y desarrollo de proyectos ágiles para el sector bancario. Refactorización de código legacy a estándares modernos para el sector bancario internacional.',
        'experience.3it.description': 'Migración de aplicaciones internas desde AngularJS hacia Angular 11, mejorando mantenibilidad.',
        'experience.consulting.description': 'Proyectos previos como Consultor y Desarrollador para el sector de transportes, público y retail, implementando soluciones corporativas (Java, Angular, Oracle, Siebel).',
        'education.title': 'Educación',
        'education.bsc.description': 'Estudié conceptos fundamentales de ciencias de la computación y prácticas de desarrollo de software.',
        'education.msc.description': 'Me enfoqué en principios avanzados de ingeniería de software y gestión de proyectos.',
        'education.certificate.description': 'Exploré algoritmos de aprendizaje automático y aplicaciones de inteligencia artificial.',
        'carousel.title': 'Proyectos Destacados',
        'carousel.playOnItchIo': 'Jugar en itch.io',
        'footer.title': 'Derechos de Autor © ',
        'footer.title2': ' - Todos los Derechos Reservados',
        'footer.message': 'Hecho con ❤️ por el equipo de Desarrollo',
        'arcade.insertCoin': 'Insertar Moneda / Salir',
        'arcade.score': 'Puntaje',
        'arcade.highScore': 'Puntaje Máximo',
        'arcade.playAgain': 'Jugar de Nuevo',
        'arcade.controls': 'Controles: Clic / Toque / Teclado',
        'arcade.synthTitle': 'Sintetizador Synth Wave',
        'arcade.pixelTitle': 'Lienzo Pixel Art Retro',
        'arcade.terminalPlaceholder': 'Escribe help, about, clear, hello, joke...',
        'arcade.clear': 'Limpiar Lienzo',
        'arcade.download': 'Descargar Arte',
        'arcade.particlesTitle': 'Generador de Partículas de Neón',
      }
    };
    return translations[this.languageSubject.value as 'en' | 'es'][key] || key;    
  }
  
}

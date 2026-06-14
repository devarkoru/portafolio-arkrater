import { Routes } from '@angular/router';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { ProjectsPageComponent } from './components/projects-page/projects-page.component';
import { HeroComponent } from './components/hero/hero.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';

export const routes: Routes = [
    { path: 'about', component: AboutPageComponent, data: { animation: 'about' } },
    { path: 'projects', component: ProjectsPageComponent, data: { animation: 'projects' } },
    { path: 'contact', component: ContactPageComponent, data: { animation: 'contact' } },
    { path: '', component: HeroComponent, data: { animation: 'home' } },
    { path: '', redirectTo: '/', pathMatch: 'full' }, // Ruta por defecto
    { path: '**', redirectTo: '/' } // Ruta wildcard
];



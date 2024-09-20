import { Routes } from '@angular/router';
import { EducationComponent } from './components/education/education.component';
import { SkillsComponent } from './components/skills/skills.component';
import { HeroComponent } from './components/hero/hero.component';
import { PersonalComponent } from './components/personal/personal.component';

export const routes: Routes = [
    { path: 'about', component: EducationComponent, data: { animation: 'about' } },
    { path: 'projects', component: SkillsComponent, data: { animation: 'projects' } },
    { path: 'contact', component: PersonalComponent, data: { animation: 'contact' } },
    { path: '', component: HeroComponent, data: { animation: 'home' } },
    { path: '', redirectTo: '/', pathMatch: 'full' }, // Ruta por defecto
    { path: '**', redirectTo: '/' } // Ruta wildcard
];



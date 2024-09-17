import { Routes } from '@angular/router';
import { EducationComponent } from './components/education/education.component';
import { SkillsComponent } from './components/skills/skills.component';
import { HeroComponent } from './components/hero/hero.component';

export const routes: Routes = [
    { path: 'education', component: EducationComponent },
    { path: 'skills', component: SkillsComponent },
    { path: '', component: HeroComponent },
    { path: '', redirectTo: '/', pathMatch: 'full' }, // Ruta por defecto
    { path: '**', redirectTo: '/' } // Ruta wildcard
];



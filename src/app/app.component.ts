import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FooterComponent } from "./components/footer/footer.component";
import { ContactComponent } from "./components/contact/contact.component";
import { HeroComponent } from "./components/hero/hero.component";
import { AboutComponent } from './components/about/about.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { LoadingComponent } from './components/loading/loading.component';
import { loadingTransition, routeTransition } from '../route-transition';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NavbarComponent, MatSlideToggleModule, 
    FooterComponent, ContactComponent, HeroComponent, AboutComponent, GalleryComponent, LoadingComponent
    ],
  templateUrl: './app.component.html',
  animations: [ routeTransition, loadingTransition ],
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Portafolio de Arkrater';

  constructor(protected route: ActivatedRoute) {}

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  getRouteAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}

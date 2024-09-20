import { Component } from '@angular/core';
import { loadingTransition } from '../../../route-transition';
import { LoadingService } from '../../services/loading.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  animations: [ loadingTransition ],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {

  loading$: Observable<boolean>;
  
  constructor(private loadingService: LoadingService) {
    this.loading$ = this.loadingService.loading$;
  }

  ngOnInit() {
    // Initial loading simulation
    setTimeout(() => {
      this.loadingService.setLoading(false);
    }, 3000);
  }

}

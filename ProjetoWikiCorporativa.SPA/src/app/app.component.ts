import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, RouteConfigLoadStart } from '@angular/router';
import { Title } from '@angular/platform-browser';
// import { LoadingService } from './core/loading/loading.service';
import { filter, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // iniciarSistema: boolean = true;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    /*private loadingService: LoadingService*/) {

  }

  ngOnInit(): void {
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    // this.router.events
    //   .pipe(filter(event => event instanceof NavigationEnd))
    //   .pipe(map(() => this.activatedRoute))
    //   .pipe(map(route => {
    //     while (route.firstChild) route = route.firstChild;
    //     return route;
    //   }))
    //   .pipe(switchMap(route => route.data))
    //   .subscribe(event => this.titleService.setTitle(event.title));

    // this.router.events
    //   .subscribe(event => {
    //     if (event instanceof RouteConfigLoadStart) {
    //       this.loadingService.start();
    //     }
    //   });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { Subscription } from 'rxjs/Rx';

// import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-profile-gallery',
  templateUrl: './profile-gallery.component.html',
  styleUrls: ['./profile-gallery.component.css']
})
export class ProfileGalleryComponent implements OnInit {

  photos: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    console.log('Foo');
    /* this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];

        this.curso = this.cursosService.getCurso(this.id);

        if (this.curso == null){
            this.router.navigate(['/cursos/naoEncontrado']);
        }
      }
    );*/

  }

}

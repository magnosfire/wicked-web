import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { Subscription } from 'rxjs/Rx';

// import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-register-club',
  templateUrl: './register-club.component.html',
  styleUrls: ['./register-club.component.css']
})
export class RegisterClubComponent implements OnInit {

  id: number;
  // inscricao: Subscription;
  curso: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router /* ,
    private cursosService: CursosService */
  ) {
    // this.id = this.route.snapshot.params['id'];
    // console.log(this.route);
  }

  ngOnInit() {
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

  /* ngOnDestroy(){
    this.inscricao.unsubscribe();
  }*/

}

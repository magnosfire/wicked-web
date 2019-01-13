import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ClubService } from '../../shared/services/club.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JwtService } from '../../shared';
// import { Subscription } from 'rxjs/Rx';

// import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-moderation-club',
  templateUrl: './moderation-club.component.html',
  styleUrls: ['./moderation-club.component.css']
})
export class ModerationClubComponent implements OnInit {

  photos: boolean = true;

  public clubInformations;
  public clubName: String = '';
  public member: boolean = false;
  public club_name;
  public userAge;
  public partnerAge;
  public token;
  private club_adm = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private jwtService : JwtService,
    private clubService: ClubService,
    private modalService: NgbModal,
    private router: Router
  ) {

    this.club_name = this.clubService.club_name;

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

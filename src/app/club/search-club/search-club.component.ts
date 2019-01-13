import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Params, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-search-club',
  templateUrl: './search-club.component.html',
  styleUrls: ['./search-club.component.css']
})
export class SearchClubComponent implements OnInit {


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {

  }


}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aux',
  templateUrl: './aux.component.html',
  styleUrls: ['./aux.component.scss']
})
export class AuxComponent implements OnInit {

  constructor(
    public router: Router
  ) { 
    router.navigate(['/employees'])
  }

  ngOnInit(): void {
  }

}

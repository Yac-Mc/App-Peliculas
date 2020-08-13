import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  searchNav(form: NgForm){

    if (form.invalid || form.value[`search`].trim().length === 0){
      return null;
    }

    this.router.navigate(['/search', form.value[`search`].trim()]);

    form.reset();
  }

}

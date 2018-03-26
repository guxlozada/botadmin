import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/auth.service";
import {LayoutService} from "../../layout/layout.service";

@Component({

  selector: 'sa-login-info',
  templateUrl: './login-info.component.html',
})
export class LoginInfoComponent implements OnInit {

  user:any;

  constructor(
    private authService: AuthService,
              private layoutService: LayoutService) {
  }

  ngOnInit() {
    this.authService.userInfo().subscribe(user => {
      this.user = user
    })

  }

  toggleShortcut() {
    this.layoutService.onShortcutToggle()
  }

}

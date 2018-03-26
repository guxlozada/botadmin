import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';
import { Message } from 'primeng/components/common/api';
import { Subscription } from 'rxjs';
import { User } from './User';
import { Router } from "@angular/router";
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  
    users: User[];
    selectedUser: User;
    userForDialog: User;
    displayDialog: boolean;
    msgs: Message[] = [];
  
    showVar: boolean = false;
  
    get$: Subscription; 
    add$: Subscription;
    edit$: Subscription;
    delete$: Subscription;
  
    constructor(private usersService: UsersService, 
                private confirmationService: ConfirmationService, private router: Router) {
    }

    ngOnInit() {
      this.get$ = this.usersService.load().subscribe(
        users => { this.users = users; console.log(this.users) },
        error => this.showError(error)
      );
      this.userForDialog = { id: null, idUser: null, name: null, mail: null };
    }
  
    cancel() {
      this.userForDialog = { id: null, idUser: null, name: null, mail: null };
      this.displayDialog = false;
    }
  
    add() {
      this.userForDialog = { id: null, idUser: null, name: null, mail: null };
      this.displayDialog = true;
    }
  
    edit() {
      if (this.selectedUser == null) {
        return;
      }
      this.userForDialog = Object.assign({}, this.selectedUser);
      this.displayDialog = true;
    }

    generateClave() {
      if (this.selectedUser == null) {
        return;
      }
      this.confirmationService.confirm({
        message: 'Desea re-generar la clave del usuario: '+this.selectedUser.idUser+' ?',
        accept: () => {
          this.edit$ = this.usersService.generatePassword(this.selectedUser.id).subscribe(
            us=> {
              this.showSuccess('Se re-generó la clave para el usuario: '+this.selectedUser.idUser);
            }
          )
        }
      });
    }
  
    remove() {
      if (this.selectedUser == null) {
        return;
      }
      
      this.confirmationService.confirm({
        message: 'Desea eliminar el usuario: ' + this.selectedUser.idUser + ' ?',
        accept: () => {
          this.delete$ = this.usersService.delete(this.selectedUser.id).subscribe(
            sw => {
              this.users = this.users.filter(
                (element: User) => element.id !== this.selectedUser.id);
              this.showSuccess('Se eliminó el usuario: ' + this.selectedUser.idUser);
            },
            error => this.showError(error)
          );
        },
      });
    }

    save() {
      if (this.userForDialog.id) {
        // update
        this.edit$ = this.usersService.update(this.userForDialog)
          .finally(() => {
            this.userForDialog = { id: null, idUser: null, name: null, mail: null  };
            this.displayDialog = false;
          })
          .subscribe(
          () => {
            this.users.some((element: User, index: number) => {
              if (element.id === this.userForDialog.id) {
                this.users[index] = Object.assign({}, this.userForDialog);
                this.users = [...this.users];
                this.selectedUser = this.users[index];
                return true;
              }
            });
            this.showSuccess('Se actualizó el usuario: ' + this.userForDialog.idUser);
          },
          error => this.showError(error)
          );
      } else {
        // create
        this.add$ = this.usersService.create(this.userForDialog)
          .finally(() => {
            this.userForDialog = { id: null, idUser: null, name: null, mail: null  };
            this.selectedUser = null;
            this.displayDialog = false;
          })
          .subscribe(
          (user: User) => {
            this.users = [...this.users, user];
            this.showSuccess('Se agregó el usuario: ' + user.idUser);
          },
          error => this.showError(error)
          );
      }
    }
  
    ngOnDestroy() {
      if (this.get$) {
        this.get$.unsubscribe();
      }
      if (this.add$) {
        this.add$.unsubscribe();
      }
      if (this.edit$) {
        this.edit$.unsubscribe();
      }
      if (this.delete$) {
        this.delete$.unsubscribe();
      }
    }
  
    private showError(errMsg: any) {
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Error:', detail: errMsg.message });
    }
  
    private showSuccess(successMsg: string) {
      this.msgs = [];
      this.msgs.push({ severity: 'success', detail: successMsg });
    }
}

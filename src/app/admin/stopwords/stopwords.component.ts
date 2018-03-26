import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';
import { StopwordsService } from '../services/stopwords.service';
import { Message } from 'primeng/components/common/api';
import { Subscription } from 'rxjs';
import { Stopword } from './stopword';
import { Router } from "@angular/router";

@Component({
  selector: 'app-stopwords',
  templateUrl: './stopwords.component.html',
  styleUrls: ['./stopwords.component.css']
})
export class StopwordsComponent implements OnInit, OnDestroy {

  stopWords: Stopword[];
  selectedStopword: Stopword;
  stopWordForDialog: Stopword;
  displayDialog: boolean;
  msgs: Message[] = [];

  get$: Subscription;
  add$: Subscription;
  edit$: Subscription; 
  delete$: Subscription;

  constructor(private stopwordsService: StopwordsService,
    private confirmationService: ConfirmationService,
    private router: Router) {
  }


  ngOnInit() {
    this.get$ = this.stopwordsService.load().subscribe(
      stopwords => { this.stopWords = stopwords},
      error => this.showError(error)
    );
    this.stopWordForDialog = { id: null, word: null };
  }

  cancel() {
    this.stopWordForDialog = { id: null, word: null };
    this.displayDialog = false;
  }

  add() {
    this.stopWordForDialog = { id: null, word: null };
    this.displayDialog = true;
  }

  edit() {
    if (this.selectedStopword == null) {
      return;
    }
    this.stopWordForDialog = Object.assign({}, this.selectedStopword);
    this.displayDialog = true;
  }

  remove() {
    if (this.selectedStopword == null) {
      return;
    } 
    this.confirmationService.confirm({
      message: 'Desea eliminar la palabra: ' + this.selectedStopword.word + ' ?',
      accept: () => {
        this.delete$ = this.stopwordsService.delete(this.selectedStopword.id).subscribe(
          sw => {
            this.stopWords = this.stopWords.filter(
              (element: Stopword) => element.id !== this.selectedStopword.id);
            this.showSuccess('Se elimino la palabra: ' + this.selectedStopword.word);
          },
          error => this.showError(error)
        );
      },
    });

  }

  save() {
    if (this.stopWordForDialog.id) {
      // update
      this.edit$ = this.stopwordsService.update(this.stopWordForDialog)
        .finally(() => {
          this.stopWordForDialog = { id: null, word: null };
          this.displayDialog = false;
        })
        .subscribe(
        () => {
          this.stopWords.some((element: Stopword, index: number) => {
            if (element.id === this.stopWordForDialog.id) {
              this.stopWords[index] = Object.assign({}, this.stopWordForDialog);
              this.stopWords = [...this.stopWords];
              this.selectedStopword = this.stopWords[index];
              return true;
            }
          });
          this.showSuccess('Se actualizó la palabra: ' + this.selectedStopword.word);
        },
        error => this.showError(error)
        );
    } else {
      // create
      this.add$ = this.stopwordsService.create(this.stopWordForDialog)
        .finally(() => {
          this.stopWordForDialog = { id: null, word: null };
          this.selectedStopword = null;
          this.displayDialog = false;
        })
        .subscribe(
        (stopWord: Stopword) => {
          this.stopWords = [...this.stopWords, stopWord];
          this.showSuccess('Se agregó la palabra: ' + stopWord.word);
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

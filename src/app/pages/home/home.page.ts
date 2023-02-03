import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTextarea } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { GameService } from 'src/app/services/game.service';
import { MigrationService } from 'src/app/services/migrations.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public queryResults = '';
  public queryError = '';
  public currentGameLevel: Number = 1;

  private unsubscribe$ = new Subject<any>();

  @ViewChild('inputQuery')
  queryInput: IonTextarea;

  @ViewChild('popover') popover;
  isShowPopover: Boolean;

  constructor(private gameService: GameService, private migrationsService: MigrationService) { }

  ngOnInit() {
    this.gameService.getLevel().pipe(
      takeUntil(this.unsubscribe$),
      tap(level => {
        console.log('receiving change level... ', level);
        this.changeLevel(level);
      })
    ).subscribe();
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
  }

  async showLevelSelectPopover(e: Event) {
    this.popover.event = e;
    this.isShowPopover = true
  }

  async changeLevel(level: Number) {
    // update UI
    this.currentGameLevel = level;

    // update DB
    switch (level) {
      case 1:
        await this.migrationsService.createDatabaseGameLevel1();
        break;
      case 2:
        await this.migrationsService.createDatabaseGameLevel2();
        break;
      case 3:
        await this.migrationsService.createDatabaseGameLevel3();
        break;
    }
  }

  sendChangeLevel(level: Number) {
    console.log('sending change level...');
    this.gameService.setLevel(level);
    this.isShowPopover = false;
  }

  async querySubmit() {
    let query = String(this.queryInput.value);
    console.log('query:', query);

    let queryResults;
    try {
      queryResults = await this.gameService.executeQuery(query.trim());
      console.log('query results:', queryResults.values);

      this.queryResults = JSON.stringify(queryResults.values, null, 2);
      this.queryError = '';
    } catch (err) {
      console.error(err);
      this.queryResults = null;
      this.queryError = String(err);
      return;
    }
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { DBSQLiteValues } from '@capacitor-community/sqlite';
import { IonInput } from '@ionic/angular';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-sqlscratch',
  templateUrl: './sqlscratch.page.html',
  styleUrls: ['./sqlscratch.page.scss'],
})
export class SqlscratchPage implements OnInit {
  public queryResults = '';

  @ViewChild('inputQuery')
  queryInput: IonInput;

  constructor(private gameService: GameService) { }

  ngOnInit() {
  }

  async querySubmit() {
    let query = String(this.queryInput.value);
    console.log('query:', query);

    let queryResults = await this.gameService.executeQuery(query);
    console.log('query results:', queryResults);

    this.queryResults = JSON.stringify(queryResults);
  }
}

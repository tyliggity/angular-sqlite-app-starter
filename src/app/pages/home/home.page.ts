import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInput, IonTextarea } from '@ionic/angular';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public queryResults = '';
  public queryError = '';

  @ViewChild('inputQuery')
  queryInput: IonTextarea;

  constructor(private gameService: GameService) { }

  ngOnInit() {
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

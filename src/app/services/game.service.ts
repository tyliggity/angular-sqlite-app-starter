import { Injectable } from '@angular/core';
import { DBSQLiteValues } from '@capacitor-community/sqlite';
import { BehaviorSubject, Observable } from 'rxjs';
import { GameLevel } from '../models/GameLevel';
import { SQLiteService } from './sqlite.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private gameLevels: Array<GameLevel> = [];
  private currentGameLevelId = 1;

  constructor(private sqliteService: SQLiteService) {
    let gameLevel1 = {} as GameLevel;
    gameLevel1.id = 1;
    gameLevel1.dbName = 'level1';
    
    let gameLevel2 = {} as GameLevel;
    gameLevel2.id = 2;
    gameLevel2.dbName = 'level2';
    
    let gameLevel3 = {} as GameLevel;
    gameLevel3.id = 3;
    gameLevel3.dbName = 'level3';

    this.gameLevels.push(gameLevel1, gameLevel2, gameLevel3);
  }

  async executeQuery(query: string): Promise<DBSQLiteValues> {
    //get db name for current level
    let dbName = this.gameLevels.find(level => level.id === this.currentGameLevelId).dbName;
    
    //create a connection and open
    const db = await this.sqliteService.createConnection(dbName, false, "no-encryption", 1);
    await db.open();

    //detect special query
    var queryResults: DBSQLiteValues
    if (query.toLowerCase() === 'show tables') {
      queryResults = await db.getTableList();
    } else {
      //run query
      queryResults = await db.query(query);
    }

    //close the connection
    await this.sqliteService.closeConnection(dbName);

    //return the data
    return queryResults;
  }
}

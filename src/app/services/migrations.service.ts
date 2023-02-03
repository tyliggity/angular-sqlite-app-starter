import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { SQLiteService } from './sqlite.service';

@Injectable()
export class MigrationService {

  constructor(private sqliteService: SQLiteService, private databaseService: DatabaseService) {
  }

  async migrate(): Promise<any> {
    await this.createDatabaseGameLevel1();
  }

  async createDatabaseGameLevel1() {
    const db = await this.sqliteService.createConnection('level1', false, "no-encryption", 1);
    await db.open();

    // create tables
    await db.execute(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        price INTEGER NOT NULL
      )
    `);

    // insert data
    await db.execute(`INSERT OR IGNORE INTO products (id, name, price) VALUES 
      (1, 'Mini Widget', 10),
      (2, 'Big Widget', 20),
      (3, 'Super Widget', 30)
    `);
        
    //close the connection
    await this.sqliteService.closeConnection('level1');
  }

  async createDatabaseGameLevel2() {
    const db = await this.sqliteService.createConnection('level2', false, "no-encryption", 1);
    await db.open();

    // create tables
    await db.execute(`
      CREATE TABLE IF NOT EXISTS services (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        price INTEGER NOT NULL
      )
    `);

    // insert data
    await db.execute(`INSERT OR IGNORE INTO services (id, name, price) VALUES 
      (1, 'Oil Change', 100),
      (2, 'Synthetic Blenc Oil Change', 150),
      (3, 'Full Synthetic Oil Change', 250)
    `);
        
    //close the connection
    await this.sqliteService.closeConnection('level2');
  }

  async createDatabaseGameLevel3() {
    const db = await this.sqliteService.createConnection('level3', false, "no-encryption", 1);
    await db.open();

    // create tables
    await db.execute(`
      CREATE TABLE IF NOT EXISTS lands (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL
      )
    `);

    // insert data
    await db.execute(`INSERT OR IGNORE INTO lands (id, name) VALUES 
      (1, 'Munchkin Land'),
      (2, 'Candy Land'),
      (3, 'Looney Tune Land')
    `);
        
    //close the connection
    await this.sqliteService.closeConnection('level3');
  }
}

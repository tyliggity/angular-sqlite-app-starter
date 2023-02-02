import { Component } from '@angular/core';

import { StatusBar } from '@awesome-cordova-plugins/status-bar';
import { Capacitor } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { SQLiteService } from './services/sqlite.service';
import { DetailService } from './services/detail.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  private initPlugin: boolean;
  constructor(
    private platform: Platform,
    private sqlite: SQLiteService,
    private detail: DetailService
  ) {
    this.platform.ready().then(async () => {
      // this.setStatusBarOverlayWebView();
      await customElements.whenDefined('jeep-sqlite');
      this.detail.setExistingConnection(false);
      this.detail.setExportJson(false);
      this.sqlite.initializePlugin().then(async (ret) => {
        this.initPlugin = ret;
        console.log(">>>> in App this.initPlugin " + this.initPlugin)
      });
    });
  }

  setStatusBarOverlayWebView() {
    const capacitorPlatform = Capacitor.getPlatform();

    if (capacitorPlatform !== "web") {
      StatusBar.overlaysWebView(false);
    }
  }
}

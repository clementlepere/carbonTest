import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { BoardService } from '@core/services/board/board.service';
import { MountainService } from '@core/services/mountain/mountain.service';
import { PlayerService } from '@core/services/player/player.service';
import { TreasureService } from '@core/services/treasure/treasure.service';
 
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [
    PlayerService,
    MountainService,
    TreasureService,
    BoardService
  ]
})

export class CoreModule {
  /* make sure CoreModule is imported only by one NgModule the AppModule */
  constructor(
    @Optional() @SkipSelf() parentModule: CoreModule,
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}

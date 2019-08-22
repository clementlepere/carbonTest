import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerService } from '@core/services/player/player.service';
import { MountainService } from '@core/services/mountain/mountain.service';
import { TreasureService } from '@core/services/treasure/treasure.service';
import { BoardService } from '@core/services/board/board.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
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

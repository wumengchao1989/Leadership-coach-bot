import { BidiModule } from '@angular/cdk/bidi';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzCardGridDirective } from './card-grid.directive';
import { NzCardLoadingComponent } from './card-loading.component';
import { NzCardMetaComponent } from './card-meta.component';
import { NzCardTabComponent } from './card-tab.component';
import { NzCardComponent } from './card.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    NzCardComponent,
    NzCardGridDirective,
    NzCardMetaComponent,
    NzCardLoadingComponent,
    NzCardTabComponent,
  ],
  exports: [
    BidiModule,
    NzCardComponent,
    NzCardGridDirective,
    NzCardMetaComponent,
    NzCardLoadingComponent,
    NzCardTabComponent,
  ],
})
export class NzCardModule {}

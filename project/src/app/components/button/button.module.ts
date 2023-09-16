/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzButtonGroupComponent } from './button-group.component';
import { NzButtonComponent } from './button.component';

@NgModule({
  declarations: [NzButtonComponent, NzButtonGroupComponent],
  exports: [NzButtonComponent, NzButtonGroupComponent],
  imports: [BidiModule, CommonModule],
})
export class NzButtonModule {}

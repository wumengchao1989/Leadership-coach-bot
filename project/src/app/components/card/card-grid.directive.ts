/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, Input } from '@angular/core';
@Directive({
  selector: '[nz-card-grid]',
  exportAs: 'nzCardGrid',
  host: {
    class: 'ant-card-grid',
    '[class.ant-card-hoverable]': 'nzHoverable'
  }
})
export class NzCardGridDirective {
  static ngAcceptInputType_nzHoverable: any;
  @Input() nzHoverable = true;

  constructor() {}
}

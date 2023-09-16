import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  QueryList,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzCardGridDirective } from './card-grid.directive';
import { NzCardTabComponent } from './card-tab.component';

const NZ_CONFIG_MODULE_NAME: any = 'card';

@Component({
  selector: 'nz-card',
  exportAs: 'nzCard',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div
      class="ant-card-head"
      *ngIf="nzTitle || nzExtra || listOfNzCardTabComponent"
    >
      <div class="ant-card-head-wrapper">
        <div class="ant-card-head-title" *ngIf="nzTitle">
          <ng-container *nzStringTemplateOutlet="nzTitle">{{
            nzTitle
          }}</ng-container>
        </div>
        <div class="ant-card-extra" *ngIf="nzExtra">
          <ng-container *nzStringTemplateOutlet="nzExtra">{{
            nzExtra
          }}</ng-container>
        </div>
      </div>
      <ng-container *ngIf="listOfNzCardTabComponent">
        <ng-template
          [ngTemplateOutlet]="listOfNzCardTabComponent.template"
        ></ng-template>
      </ng-container>
    </div>
    <div class="ant-card-cover" *ngIf="nzCover">
      <ng-template [ngTemplateOutlet]="nzCover"></ng-template>
    </div>
    <div class="ant-card-body" [ngStyle]="nzBodyStyle">
      <ng-container *ngIf="!nzLoading; else loadingTemplate">
        <ng-content></ng-content>
      </ng-container>
      <ng-template #loadingTemplate>
        <nz-card-loading></nz-card-loading>
      </ng-template>
    </div>
    <ul class="ant-card-actions" *ngIf="nzActions.length">
      <li
        *ngFor="let action of nzActions"
        [style.width.%]="100 / nzActions.length"
      >
        <span><ng-template [ngTemplateOutlet]="action"></ng-template></span>
      </li>
    </ul>
  `,
  host: {
    class: 'ant-card',
    '[class.ant-card-loading]': 'nzLoading',
    '[class.ant-card-bordered]': 'nzBorderless === false && nzBordered',
    '[class.ant-card-hoverable]': 'nzHoverable',
    '[class.ant-card-small]': 'nzSize === "small"',
    '[class.ant-card-contain-grid]':
      'listOfNzCardGridDirective && listOfNzCardGridDirective.length',
    '[class.ant-card-type-inner]': 'nzType === "inner"',
    '[class.ant-card-contain-tabs]': '!!listOfNzCardTabComponent',
    '[class.ant-card-rtl]': `dir === 'rtl'`,
  },
})
export class NzCardComponent implements OnDestroy, OnInit {
  readonly _nzModuleName: any = NZ_CONFIG_MODULE_NAME;
  static ngAcceptInputType_nzBordered: any;
  static ngAcceptInputType_nzBorderless: any;
  static ngAcceptInputType_nzLoading: any;
  static ngAcceptInputType_nzHoverable: any;

  @Input() nzBordered: boolean = true;
  @Input() nzBorderless: boolean = false;
  @Input() nzLoading = false;
  @Input() nzHoverable: boolean = false;
  @Input() nzBodyStyle: any = null;
  @Input() nzCover?: TemplateRef<void>;
  @Input() nzActions: Array<TemplateRef<void>> = [];
  @Input() nzType: string | 'inner' | null = null;
  @Input() nzSize: any = 'default';
  @Input() nzTitle?: string | TemplateRef<void>;
  @Input() nzExtra?: string | TemplateRef<void>;
  @ContentChild(NzCardTabComponent, { static: false })
  listOfNzCardTabComponent?: NzCardTabComponent;
  @ContentChildren(NzCardGridDirective)
  listOfNzCardGridDirective!: QueryList<NzCardGridDirective>;
  dir: Direction = 'ltr';

  private destroy$ = new Subject();

  constructor(
    private cdr: ChangeDetectorRef,
    @Optional() private directionality: Directionality
  ) {}

  ngOnInit(): void {
    this.directionality.change
      ?.pipe(takeUntil(this.destroy$))
      .subscribe((direction: Direction) => {
        this.dir = direction;
        this.cdr.detectChanges();
      });

    this.dir = this.directionality.value;
  }
  ngOnDestroy(): void {
    this.destroy$.complete();
  }
}

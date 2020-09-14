import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
  imports: [
    CommonModule,
    NzButtonModule,
    NzSelectModule,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    NzFormModule,
    NzCardModule,
    NzRateModule,
    NzPaginationModule,
    NzDividerModule,
    NzDatePickerModule,
    NzTimePickerModule,
    NzCarouselModule,
    NzSpinModule,
    NzDrawerModule,
    NzInputModule,
    NzModalModule
  ],
  exports: [
    NzButtonModule,
    NzSelectModule,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    NzFormModule,
    NzCardModule,
    NzRateModule,
    NzPaginationModule,
    NzDividerModule,
    NzDatePickerModule,
    NzTimePickerModule,
    NzCarouselModule,
    NzSpinModule,
    NzDrawerModule,
    NzInputModule,
    NzModalModule
  ],

})
export class NgZorroModule { }

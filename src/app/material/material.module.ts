import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import {MAT_DATE_FORMATS, MatDateFormats, MatNativeDateModule}  from '@angular/material/core';

import {MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatTreeModule } from '@angular/material/tree';
import { MatRadioModule } from '@angular/material/radio';
import {MatSliderModule} from '@angular/material/slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {TextFieldModule} from '@angular/cdk/text-field';
import {MatBadgeModule} from '@angular/material/badge';
import { MatTableModule } from '@angular/material/table';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';

export const MY_FORMATS: MatDateFormats  = {
  parse: {
      dateInput: 'DD-MMM-YYYY',
  },
  display: {
      dateInput: 'DD-MMM-YYYY',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'DD-MMM-YYYY',
      monthYearA11yLabel: 'MMM YYYY',
  },
};

const MATERIAL_COMPONENTS: any[] | Type<any> | ModuleWithProviders<{}> = [

  MatIconModule,
  MatCardModule,
  MatFormFieldModule,
  MatSelectModule,
  MatDividerModule,
  MatProgressBarModule,
  MatMenuModule,
  MatTooltipModule,
  MatInputModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatSlideToggleModule,
  MatButtonModule,
  MatSlideToggleModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatTreeModule,
  MatRadioModule,
  MatSlideToggleModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatExpansionModule,
  FormsModule,
  MatTabsModule,
  MatChipsModule,
  MatDialogModule,
  MatFormFieldModule,
  ReactiveFormsModule,
  MatRadioModule,
  MatPaginatorModule,
  CKEditorModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  ScrollingModule,MatAutocompleteModule,
  NgxMatSelectSearchModule,
  MatProgressSpinnerModule,
  TextFieldModule,
  MatSliderModule,
  MatBadgeModule,
  MatTabsModule,
  MatTableModule,
  ClipboardModule,
  MatBottomSheetModule


];

@NgModule({
  declarations: [],
  imports: [
    MATERIAL_COMPONENTS
  ],
  exports: [
    MATERIAL_COMPONENTS
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    // {provide: MAT_DATE_LOCALE, useValue: 'de'},
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class MaterialModule { }

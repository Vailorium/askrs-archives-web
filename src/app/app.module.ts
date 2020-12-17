import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatTableModule, MatTableDataSource, MatFormFieldModule, MatInputModule, MatDividerModule, MatRippleModule, MatSnackBarModule, MatCardModule, MatSelectModule, MatOptionModule, MatAutocompleteModule, MatTooltipModule, MatCheckboxModule, MatProgressSpinnerModule, MatGridListModule, MatTabsModule, MatDialogModule, MatExpansionPanel, MatExpansionModule, MatPaginatorModule, MatStepperModule, MatButtonToggleModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SkillInfoDialog } from './pages/skill-info-dialog/skill-info-dialog';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StringFilterByPipe, HeroSkillFilterByPipe } from './pipes';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SkillInfoComponent } from './pages/skill-info/skill-info.component';
import { HttpClientModule } from '@angular/common/http';
import { ArBuilderComponent } from './pages/ar-builder/ar-builder.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ARBuilderStructuresDialog } from './pages/ar-builder/ar-builder-structures-dialog/ar-builder-structures-dialog';
import { ARBuilderHeroesDialog } from './pages/ar-builder/ar-builder-heroes-dialog/ar-builder-heroes-dialog';
import { ARBuilderTerrainDialog } from './pages/ar-builder/ar-builder-terrain-dialog/ar-builder-terrain-dialog';
import { AREditBuildDialog } from './pages/ar-builder/ar-edit-build-dialog/ar-edit-build-dialog';
import { EditBuild } from './pages/edit-build/edit-build';

@NgModule({
  declarations: [
    AppComponent,
    SkillInfoDialog,
    StringFilterByPipe,
    HeroSkillFilterByPipe,
    NotFoundComponent,
    SkillInfoComponent,
    ArBuilderComponent,
    ARBuilderStructuresDialog,
    ARBuilderHeroesDialog,
    ARBuilderTerrainDialog,
    AREditBuildDialog,
    EditBuild
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatRippleModule,
    MatSnackBarModule,
    MatCardModule,
    MatSelectModule,
    MatOptionModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatTableModule,
    MatTabsModule,
    MatDialogModule,
    MatExpansionModule,
    MatDividerModule,
    MatPaginatorModule,
    NgxMatSelectSearchModule,
    MatStepperModule,
    HttpClientModule,
    DragDropModule,
    MatButtonToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [SkillInfoDialog, ARBuilderStructuresDialog, ARBuilderHeroesDialog, ARBuilderTerrainDialog, AREditBuildDialog]
})
export class AppModule { }

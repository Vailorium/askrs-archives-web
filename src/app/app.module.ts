import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatTableModule, MatTableDataSource, MatFormFieldModule, MatInputModule, MatDividerModule, MatRippleModule, MatSnackBarModule, MatCardModule, MatSelectModule, MatOptionModule, MatAutocompleteModule, MatTooltipModule, MatCheckboxModule, MatProgressSpinnerModule, MatGridListModule, MatTabsModule, MatDialogModule, MatExpansionPanel, MatExpansionModule, MatPaginatorModule, MatStepperModule, MatButtonToggleModule, MatIconModule } from '@angular/material';
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
import { ReportBugDialog } from './pages/report-bug-dialog/report-bug-dialog';
import { ContributionsDialog } from './pages/contributions-dialog/contributions-dialog';
import { ARBuilderSaveDialog } from './pages/ar-builder/ar-builder-save-dialog/ar-builder-save-dialog';
import { ConfirmDialog } from './pages/confirm-dialog/confirm-dialog';
import { ARURLShareDialog } from './pages/ar-builder/ar-url-share-dialog/ar-url-share-dialog';
import { ErrorDialog } from './pages/error-dialog/error-dialog';
import { ARSettingsDialog } from './pages/ar-builder/ar-settings-dialog/ar-settings-dialog';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ARSaveImageDialog } from './pages/ar-builder/ar-save-image-dialog/ar-save-image-dialog';
import { TitleCasePipe } from '@angular/common';

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
    ARBuilderSaveDialog,
    EditBuild,
    ReportBugDialog,
    ContributionsDialog,
    ConfirmDialog,
    ARURLShareDialog,
    ErrorDialog,
    ARSettingsDialog,
    HomePageComponent,
    ARSaveImageDialog
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
    MatButtonToggleModule,
    MatIconModule
  ],
  providers: [Title, TitleCasePipe],
  bootstrap: [AppComponent],
  entryComponents: [ARSaveImageDialog, ARSettingsDialog, ErrorDialog, SkillInfoDialog, ARBuilderStructuresDialog, ARBuilderHeroesDialog, ARBuilderTerrainDialog, AREditBuildDialog, ReportBugDialog, ContributionsDialog, ARBuilderSaveDialog, ConfirmDialog, ARURLShareDialog]
})
export class AppModule { }

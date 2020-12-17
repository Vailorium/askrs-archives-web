import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ArBuilderComponent } from './pages/ar-builder/ar-builder.component';
import { EditBuild } from './pages/edit-build/edit-build';


const routes: Routes = [
  { path: 'ar-builder', component: ArBuilderComponent},
  // { path: 'edit-build-debug', component: EditBuild},
  { path: '', redirectTo: 'ar-builder', pathMatch: 'full'},
  { path: '**', pathMatch: 'full', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

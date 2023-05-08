import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectStoreComponent } from 'src/app/pages/main/modules/store/components/select-store/select-store.component';
import { StoreComponent } from 'src/app/pages/main/modules/store/components/store/store.component';

const routes: Routes = [
  { path: '', component: SelectStoreComponent },
  { path: ':id', component: StoreComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }

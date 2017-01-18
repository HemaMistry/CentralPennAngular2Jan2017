/**
 * Created by mikem on 1/17/2017.
 */

/*
  Route configuration
 */
import {Routes, RouterModule} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {DirectoryComponent} from "./directory/directory.component";
import {ModuleWithProviders} from "@angular/core";
export const AppRoutes : Routes = [
  { path: '', component: HomeComponent },
  { path: 'directory', component: DirectoryComponent }
  // { path: 'directory/:id', component: DirectoryComponent }
]

export const AppRouting : ModuleWithProviders = RouterModule.forRoot(AppRoutes);

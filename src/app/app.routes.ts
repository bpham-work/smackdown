import { Routes } from '@angular/router';
import { NoContentComponent } from './no-content';

import { BattleComponent } from './battle/battle.component';

export const ROUTES: Routes = [
  { path: '',      component: BattleComponent },
  { path: 'home',  component: BattleComponent },
  { path: '**',    component: NoContentComponent },
];

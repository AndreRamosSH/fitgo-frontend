import { NgModule } from '@angular/core';
import {
  LucideChevronLeft,
  LucideChevronRight,
  LucideShield,
  LucideDumbbell,
  LucideUser,
  LucidePlus,
  LucideChevronDown,
  LucideSquarePen,
  LucideTrash2,
  LucideSearch,
  LucideCirclePlus,
  LucideFunnel,
  LucideCircleAlert,
  LucideMenu,
  LucideX,
  LucideTrendingUp,
  LucidePartyPopper,
  LucideCheck,
  LucideUndo2
} from '@lucide/angular';

const ICONS = [
  LucideChevronLeft,
  LucideChevronRight,
  LucideShield,
  LucideDumbbell,
  LucideUser,
  LucidePlus,
  LucideChevronDown,
  LucideSquarePen,
  LucideTrash2,
  LucideSearch,
  LucideCirclePlus,
  LucideFunnel,
  LucideCircleAlert,
  LucideMenu,
  LucideX,
  LucideTrendingUp,
  LucidePartyPopper,
  LucideCheck,
  LucideUndo2
];

@NgModule({
  imports: ICONS,
  exports: ICONS
})
export class SharedLucideIconsModule {}

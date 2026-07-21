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
  LucideUndo2,
  LucideEye,
  LucideEyeOff
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
  LucideUndo2,
  LucideEye,
  LucideEyeOff
];

@NgModule({
  imports: ICONS,
  exports: ICONS
})
export class SharedLucideIconsModule {}

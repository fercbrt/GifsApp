import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './Sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {

  constructor( private gifsService: GifsService) {}

  get tagsHistory(): string[] {
    return this.gifsService.tagsHitory;
  }

  searchTag(tag: string): void {
    this.gifsService.searchTag(tag);
  }
}

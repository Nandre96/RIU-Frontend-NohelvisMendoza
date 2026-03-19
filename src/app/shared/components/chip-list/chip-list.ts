import { Component, input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-chip-list',
  imports: [MatChipsModule],
  templateUrl: './chip-list.html',
  styleUrl: './chip-list.css',
})
export class ChipList {
  title = input<string>('');
  list = input<string[]>(['']);
}

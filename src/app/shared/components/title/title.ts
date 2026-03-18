import { U } from '@angular/cdk/keycodes';
import { UpperCasePipe } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-title',
  imports: [MatIcon, MatDivider, UpperCasePipe],
  templateUrl: './title.html',
  styleUrl: './title.css',
})
export class Title {
  icon = input<string>();
  title = input.required<string>();
  divider = input<boolean>(true);
}

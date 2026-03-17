import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLinkWithHref, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, MatDividerModule, RouterLinkWithHref, RouterModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  protected readonly title = signal('Super Heroes');
}

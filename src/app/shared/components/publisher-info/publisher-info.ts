import { Component, input } from '@angular/core';
import { PublisherView } from '../../../heroes/models/interfaces/view/publisher-view.interface';

@Component({
  selector: 'app-publisher-info',
  templateUrl: './publisher-info.html',
  styleUrl: './publisher-info.css',
})
export class PublisherInfo {
  publisher = input.required<PublisherView>();
}

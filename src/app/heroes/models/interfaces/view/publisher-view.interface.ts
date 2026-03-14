import { PublisherType } from '../../types/publisher.type';

export interface PublisherView {
  id: PublisherType;
  label: string;
  description: string;
  foundationYear: number;
  urlLogo?: string;
}

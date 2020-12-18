import {Creator} from './creator';

export class Character {
  id: number;
  firstName: string;
  lastName: string;
  publishedDate: Date;
  creator: Creator;
  story: string;
}

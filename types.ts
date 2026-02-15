
export interface Game {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  category: Category;
  isHot?: boolean;
}

export enum Category {
  ALL = 'All',
  ACTION = 'Action',
  PUZZLE = 'Puzzle',
  ARCADE = 'Arcade',
  CLASSIC = 'Classic',
  SPORTS = 'Sports'
}

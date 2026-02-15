
import { Game, Category } from './types';

export const GAMES_DATA: Game[] = [
  {
    id: '2048',
    title: '2048',
    description: 'The classic number merging puzzle game.',
    thumbnail: 'https://picsum.photos/seed/2048/400/300',
    url: 'https://play2048.co/',
    category: Category.PUZZLE,
    isHot: true
  },
  {
    id: 'hextris',
    title: 'Hextris',
    description: 'A fast-paced puzzle game inspired by Tetris.',
    thumbnail: 'https://picsum.photos/seed/hextris/400/300',
    url: 'https://hextris.io/',
    category: Category.ARCADE,
    isHot: true
  },
  {
    id: 'flappybird',
    title: 'Flappy Bird Clone',
    description: 'Fly between pipes in this addictive arcade classic.',
    thumbnail: 'https://picsum.photos/seed/flappy/400/300',
    url: 'https://flappybird.io/',
    category: Category.ARCADE
  },
  {
    id: 'pacman',
    title: 'Pac-Man',
    description: 'The iconic dot-eating maze runner.',
    thumbnail: 'https://picsum.photos/seed/pacman/400/300',
    url: 'https://www.google.com/logos/2010/pacman10-i.html',
    category: Category.CLASSIC,
    isHot: true
  },
  {
    id: 'doodlejump',
    title: 'Doodle Jump',
    description: 'Jump to the top as high as you can!',
    thumbnail: 'https://picsum.photos/seed/doodle/400/300',
    url: 'https://doodlejump.io/',
    category: Category.ARCADE
  },
  {
    id: 'snake',
    title: 'Google Snake',
    description: 'The classic snake game you know and love.',
    thumbnail: 'https://picsum.photos/seed/snake/400/300',
    url: 'https://www.google.com/logos/2010/pacman10-i.html', // Note: Placeholder as Snake is usually integrated
    category: Category.CLASSIC
  },
  {
    id: 'chess',
    title: 'Lichess',
    description: 'Play chess against the computer or others.',
    thumbnail: 'https://picsum.photos/seed/chess/400/300',
    url: 'https://lichess.org/tv',
    category: Category.PUZZLE
  },
  {
    id: 'crossy-road',
    title: 'Crossy Road',
    description: 'Help the chicken cross the road safely.',
    thumbnail: 'https://picsum.photos/seed/crossy/400/300',
    url: 'https://crossyroad.com/',
    category: Category.ARCADE
  }
];

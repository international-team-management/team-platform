import photo from '../../assets/user-avatar.svg';
import type { ColumnType } from 'src/services/api/types';

export const mockEmptyColumn: ColumnType[] = [
  {
    id: 1,
    title: 'Backlog',
    tasks: [],
  },
  {
    id: 2,
    title: 'To Do',
    tasks: [],
  },
  {
    id: 3,
    title: 'In Progress',
    tasks: [],
  },
  {
    id: 4,
    title: 'In Review',
    tasks: [],
  },
  {
    id: 5,
    title: 'Done',
    tasks: [],
  },
];

export const mockColumnItems: ColumnType[] = [
  {
    id: 1,
    title: 'Backlog',
    tasks: [
      {
        id: 11,
        subtitle: 'Поиск инвесторов на “Форум Развития 2023”',
        expiredDate: '23 июля',
        img: '',
      },
      {
        id: 12,
        subtitle:
          'Создание новой таблицы лидеров по велогонке на стадионе во Франции',
        expiredDate: '28 июля',
        img: '',
      },
      {
        id: 13,
        subtitle:
          'Заново произвести замер всех изменений за сутки в краторе вулкана на острове Ява',
        expiredDate: '4 августа',
        img: '',
      },
    ],
  },
  {
    id: 2,
    title: 'To Do',
    tasks: [
      {
        id: 14,
        subtitle:
          'Создание новой таблицы лидеров по велогонке на стадионе во Франции',
        expiredDate: '28 июля',
        img: photo,
      },
    ],
  },
  {
    id: 3,
    title: 'In Progress',
    tasks: [
      {
        id: 15,
        subtitle:
          'Заново произвести замер всех изменений за сутки в краторе вулкана на острове Ява',
        expiredDate: '14 июня',
        img: photo,
      },
    ],
  },
  {
    id: 4,
    title: 'In Review',
    tasks: [
      {
        id: 16,
        subtitle: 'Поиск инвесторов на “Форум Развития 2023”',
        expiredDate: '4 июня',
        img: photo,
      },
    ],
  },
  {
    id: 5,
    title: 'Done',
    tasks: [
      {
        id: 17,
        subtitle:
          'Заново произвести замер всех изменений за сутки в краторе вулкана на острове Ява',
        expiredDate: '3 июля',
        img: '',
      },
    ],
  },
];

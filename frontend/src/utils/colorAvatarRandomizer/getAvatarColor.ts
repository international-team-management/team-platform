import colors from './avatarColors.module.scss';

type TPaletteItem = {
  bg: string;
  txt: string;
};

const palette: TPaletteItem[] = [
  {
    bg: colors.blue_bg,
    txt: colors.blue_txt,
  },
  {
    bg: colors.margenta_bg,
    txt: colors.margenta_txt,
  },
  {
    bg: colors.orange_bg,
    txt: colors.orange_txt,
  },
  {
    bg: colors.green_bg,
    txt: colors.green_txt,
  },
  {
    bg: colors.purple_bg,
    txt: colors.purple_txt,
  },
];

export const getAvatarColor = (
  min = 0,
  max = palette.length - 1,
): TPaletteItem => {
  const random = Math.floor(min + Math.random() * (max + 1 - min));

  const localColor = localStorage.getItem('avatarColor');

  if (!localColor) {
    localStorage.setItem('avatarColor', JSON.stringify(palette[random]));
  }

  const result = JSON.parse(localColor!);

  return result;
};

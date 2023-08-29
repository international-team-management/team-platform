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

  if (!localStorage.getItem('avatarColor')) {
    const localColor = palette[random];
    localStorage.setItem('avatarColor', JSON.stringify(localColor));
    return localColor;
  }

  return JSON.parse(localStorage.getItem('avatarColor')!);
};

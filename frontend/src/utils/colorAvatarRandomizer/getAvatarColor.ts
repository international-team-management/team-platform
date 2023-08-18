import colors from './avatarColors.module.scss';

type TPalleteItem = {
  bg: string;
  txt: string;
};

const pallete: TPalleteItem[] = [
  {
    bg: colors.blue_bg,
    txt: colors.bule_txt,
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
  max = pallete.length - 1,
): TPalleteItem => {
  const random = Math.floor(min + Math.random() * (max + 1 - min));

  const localColor = localStorage.getItem('avatarColor');

  if (!localColor) {
    localStorage.setItem('avatarColor', JSON.stringify(pallete[random]));
  }

  const result = JSON.parse(localColor!);

  return result;
};

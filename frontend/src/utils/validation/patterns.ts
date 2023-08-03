export const patterns = {
  NAME: /^[A-Za-zА-Яа-яЁё0-9-\s]+$/,
  ROLE: /^[A-Za-zА-Яа-яЁё/0-9-\s]+$/,
  PASSWORD: /^[A-Za-z0-9-\s!#$%&:+-.,=?^_{}~]+$/,
  EMAIL:
    /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};

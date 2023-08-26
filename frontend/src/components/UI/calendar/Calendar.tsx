import React from 'react';
import styles from './Calendar.module.scss';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { StyledEngineProvider } from '@mui/material/styles';
import { ReactComponent as CalendarIcon } from 'assets/calendar.svg';
import 'dayjs/locale/ru';
import clsx from 'clsx';
import moment from 'moment';
import 'moment/dist/locale/ru';
import './Calendar.scss';
import { useDispatch, useSelector } from 'src/services/hooks';
import { closePopup, openPopup } from 'src/services/slices/popupSlice';

type DateCalendarValue = {
  $d: Date;
};

type CalendarProps = {
  initialValue?: Date;
  onChange: (date: Date) => void;
};

export const Calendar: React.FC<CalendarProps> = (props: CalendarProps) => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((store) => store.popup);
  const [value, setValue] = React.useState<Date>(
    props.initialValue || new Date(),
  );
  const [title, setTitle] = React.useState<string>(
    props.initialValue ? formatDate(props.initialValue) : '',
  );

  const saveDate = () => {
    setTitle(formatDate(value));
    dispatch(closePopup());
    props.onChange(value);
  };

  function formatDate(date: Date): string {
    return moment(date).locale('ru').format('LL').slice(0, -3);
  }

  const togglePopap = () => {
    if (isOpen) {
      dispatch(closePopup());
    } else {
      dispatch(openPopup());
    }
  };

  return (
    <>
      <div
        className={clsx(styles.calendar__field, {
          [styles.calendar__field_active]: isOpen === true,
        })}
      >
        <div className={styles.calendar__data}>{title}</div>
        <CalendarIcon onClick={() => togglePopap()} />
      </div>

      {isOpen && (
        <div className={styles.calendar}>
          <StyledEngineProvider injectFirst>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
              <DateCalendar<DateCalendarValue>
                onChange={(newValue) => newValue && setValue(newValue.$d)}
                openTo="month"
                className={styles.calendar__content}
              />
            </LocalizationProvider>
          </StyledEngineProvider>
          <div className={styles.calendar__buttons}>
            <button className={styles.calendar__button_save} onClick={saveDate}>
              Сохранить изменения
            </button>
            <button
              className={styles.calendar__button_cancel}
              onClick={() => dispatch(closePopup())}
            >
              Отменить
            </button>
          </div>
        </div>
      )}
    </>
  );
};

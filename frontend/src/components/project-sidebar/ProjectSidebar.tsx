import styles from './ProjectSidebar.module.scss';
import {
  RightSidebarTemplate,
  RightSidebarPropsType,
} from '../UI/right-sidebar-template/RightSidebarTemplate';
import { RightSidebarTitleInputTemplate as InputTitle } from '../UI/right-sidebar-title-input-template/RightSidebarTitleInputTemplate';
import {
  OptionType,
  RightSidebarSelectTemplate as Select,
} from '../UI/right-sidebar-select-template/RightSidebarSelectTemplate';
import { RightSidebarDescriptionTemplate as Description } from '../UI/right-sidebar-description-template/RightSidebarDescriptionTemplate';
import { useForm } from 'react-hook-form';
import { SingleValue } from 'react-select';
import { InputName } from 'src/typings/constants';

export const ProjectSidebar = ({
  isOpened,
  close,
  showActions,
}: RightSidebarPropsType): JSX.Element => {
  // until there is redux
  const PRIORITY_OPTIONS = [
    { value: 'High', label: 'High' },
    { value: 'Mwdium', label: 'Medium' },
    { value: 'Low', label: 'Low' },
  ];
  // until there is redux
  const STATUS_OPTIONS = [
    { value: 'Done', label: 'Done' },
    { value: 'In progress', label: 'In progress' },
    { value: 'To do', label: 'To do' },
  ];

  const { register } = useForm({
    defaultValues: {
      // it works for inputs/textareas, not for selects
      [InputName.PROJECT_TITLE]:
        'Имя проектаИмя проектаИмя проекта Имя проекта',
      [InputName.PROJECT_DESCRIPTION]:
        'Здесь описание проекта на много-много строк\nЗдесь описание проекта на много-много строк',
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const handleInputSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const handleSelectSubmit = (
    choice: SingleValue<OptionType>,
    fieldName: string | undefined,
  ) => {
    console.log(choice, fieldName);
  };

  return (
    <RightSidebarTemplate
      isOpened={isOpened}
      close={close}
      showActions={showActions}
    >
      <form className={styles.form}>
        <InputTitle
          name={InputName.PROJECT_TITLE}
          register={register}
          onChange={handleChange}
          onBlur={handleInputSubmit}
        />

        <Select
          name={InputName.PROJECT_PRIORITY}
          label={'Приортет'}
          options={PRIORITY_OPTIONS}
          value={null}
          handleChange={handleSelectSubmit}
        />

        <Select
          name={InputName.PROJECT_STATUS}
          label={'Статус'}
          options={STATUS_OPTIONS}
          value={null}
          handleChange={handleSelectSubmit}
        />

        {/* replace it with Deadline */}
        <Select
          name={''}
          label={'Дедлайн (заглушка)'}
          options={[]}
          value={null}
          handleChange={handleSelectSubmit}
        />

        {/* replace it with Teammates */}
        <Select
          name={''}
          label={'Участники (заглушка)'}
          options={[]}
          value={null}
          handleChange={handleSelectSubmit}
        />

        <Description
          name={InputName.PROJECT_DESCRIPTION}
          label={'Описание проекта'}
          placeholder={'Напишите подробнее о задаче.'}
          register={register}
          onChange={handleChange}
          onBlur={handleInputSubmit}
        />
      </form>
    </RightSidebarTemplate>
  );
};

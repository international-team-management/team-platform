import {
  RightSidebarTemplate,
  RightSidebarPropsType,
} from '../UI/right-sidebar-template/RightSidebarTemplate';
import { RightSidebarTitleInputTemplate as InputTitle } from '../UI/right-sidebar-title-input-template/RightSidebarTitleInputTemplate';
import { useForm } from 'react-hook-form';
import { InputName, InputType } from 'src/typings/constants';

export const ProjectSidebar = ({
  isOpened,
  close,
  showActions,
}: RightSidebarPropsType): JSX.Element => {
  const { register } = useForm({
    defaultValues: {
      [InputName.PROJECT_TITLE]:
        'Имя проектаИмя проектаИмя проекта Имя проекта Имя проектаИмя проекта Имя проекта Имя проекта Имя проекта Имя проекта Имя проекта Имя проекта Имя проектаИмя проекта',
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const handleInputSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  return (
    <RightSidebarTemplate
      isOpened={isOpened}
      close={close}
      showActions={showActions}
    >
      <form>
        <InputTitle
          name={InputName.PROJECT_TITLE}
          register={register}
          onChange={handleChange}
          onBlur={handleInputSubmit}
        />
      </form>
    </RightSidebarTemplate>
  );
};

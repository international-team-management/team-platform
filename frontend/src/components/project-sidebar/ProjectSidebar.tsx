import {
  RightSidebarTemplate,
  RightSidebarPropsType,
} from '../UI/right-sidebar-template/RightSidebarTemplate';

export const ProjectSidebar = ({
  isOpened,
  close,
  showActions,
}: RightSidebarPropsType): JSX.Element => {
  isOpened = true;

  return (
    <RightSidebarTemplate
      isOpened={isOpened}
      close={close}
      showActions={showActions}
    >
      <div style={{ lineHeight: '32px' }}>Here will be a form</div>
    </RightSidebarTemplate>
  );
};

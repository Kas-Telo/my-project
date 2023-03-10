import avatarDefault from '../../../../assets/images/avatar-default.png';
import { BodyTypography } from '../../../../ui/typography';

import style from './user-block.module.css';

type Props = {
  avatar: string | null;
  dataOfCreation: Date;
  fullName: string;
};

export const UserBlock = ({ avatar, dataOfCreation, fullName }: Props) => {
  const baseURLForImage = 'https://strapi.cleverland.by';

  return (
    <div className={style.container}>
      <div>
        <img className={style.avatar} src={avatar ? `${baseURLForImage}${avatar}` : avatarDefault} alt='ava' />
      </div>
      <div className={style.descriptionContainer}>
        <BodyTypography className={style.typography} type='large'>
          {fullName}
        </BodyTypography>
        <BodyTypography className={style.typography} type='large'>
          {dataOfCreation.toString()}
        </BodyTypography>
      </div>
    </div>
  );
};

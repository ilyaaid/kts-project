import { Link } from 'react-router';
import BagIcon from 'components/icons/BagIcon';
import ProfileIcon from 'components/icons/ProfileIcon';
import { routes } from 'config/routes';

const Icons = () => {
  return (
    <>
      <Link to={routes.cart.create()}>
        <BagIcon width={30} height={30}></BagIcon>
      </Link>
      <Link to={routes.profile.create()}>
        <ProfileIcon width={30} height={30}></ProfileIcon>
      </Link>
    </>
  );
};

export default Icons;

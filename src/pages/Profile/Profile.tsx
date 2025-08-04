import { observer } from 'mobx-react-lite';
import React from 'react';
import { useNavigate } from 'react-router';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Text from 'components/Text';
import { routes } from 'config/routes';
import rootStore from 'store/RootStore';
import styles from './Profile.module.scss';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const handleLogout = React.useCallback(() => {
    rootStore.user.logout();
    navigate(routes.login.create());
  }, [navigate]);

  const { user } = rootStore.user;
  return (
    <div className={styles.container}>
      {!user ? (
        <Loader />
      ) : (
        <div className={styles.profileCard}>
          <Text className={styles.avatar} view="title">
            {user.username.charAt(0).toUpperCase()}
          </Text>
          <Text className={styles.username} weight="bold" view="subtitle">
            {user.username}
          </Text>
          <div className={styles.infoItem}>
            <Text className={styles.infoLabel} weight="medium">
              Email:
            </Text>
            <Text className={styles.infoValue} weight="bold">
              {user.email}
            </Text>
          </div>
          <div className={styles.infoItem}>
            <Text className={styles.infoLabel} weight="medium">
              Joined:
            </Text>
            <Text className={styles.infoValue} weight="bold">
              {user.createdAt.toLocaleDateString()}
            </Text>
          </div>
          <Button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </Button>
        </div>
      )}
    </div>
  );
};

export default observer(Profile);

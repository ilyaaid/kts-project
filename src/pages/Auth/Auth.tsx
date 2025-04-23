import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React, { HTMLAttributes } from 'react';
import { Link, useNavigate } from 'react-router';
import Button from 'components/Button';
import Input from 'components/Input';
import Text from 'components/Text';
import { routes } from 'config/routes';
import AuthStore, { ModeValue } from 'store/AuthStore';
import { useLocalStore } from 'utils/useLocalStore';
import styles from './Auth.module.scss';

type AuthProps = HTMLAttributes<HTMLDivElement> & {
  mode: ModeValue;
};

const Auth: React.FC<AuthProps> = ({ mode }) => {
  const navigate = useNavigate();
  const authStore = useLocalStore<AuthStore>(() => new AuthStore(mode));

  const handleSubmit = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      authStore.submit().then((resp) => {
        if (!resp) {
          return;
        }
        if (authStore.isReg) {
          navigate(routes.login.create());
        } else {
          navigate(routes.products.create());
        }
      });
    },
    [authStore, navigate],
  );

  const isReg = mode === ModeValue.REG;
  const isSubmitting = authStore.isSubmitting;
  const errors = authStore.formErrors;
  const formData = authStore.formData;

  return (
    <div className={styles.card}>
      <Text className={styles.title} tag="h2" view="subtitle">
        {mode === 'login' ? 'Login' : 'Register'}
      </Text>

      <form onSubmit={handleSubmit} className={styles.form}>
        {isReg && (
          <div className={styles.form__group}>
            <label htmlFor="username">
              <Text tag="div" view="p-14">
                Username
              </Text>
            </label>
            <Input
              className={classNames(styles.input, { [styles.input_error]: errors.username })}
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={formData.username ?? ''}
              onChange={(val) => authStore.setValue('username', val)}
              autoComplete="username"
            />
            {errors.username && <div className={styles.error_message}>{errors.username}</div>}
          </div>
        )}

        <div className={styles.form__group}>
          <label htmlFor="email">
            <Text tag="div" view="p-14">
              Email
            </Text>
          </label>
          <Input
            className={classNames(styles.input, { [styles.input_error]: errors.email })}
            type="text"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(val) => authStore.setValue('email', val)}
            autoComplete="email"
          />
          {errors.email && <div className={styles.error_message}>{errors.email}</div>}
        </div>

        <div className={styles.form__group}>
          <label htmlFor="password">
            <Text tag="div" view="p-14">
              Password
            </Text>
          </label>
          <Input
            className={classNames(styles.input, { [styles.input_error]: errors.password })}
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={(val) => authStore.setValue('password', val)}
            autoComplete="current-password"
          />
          {errors.password && <div className={styles.error_message}>{errors.password}</div>}
        </div>

        {isReg && (
          <div className={styles.form__group}>
            <label htmlFor="confirmPassword">
              <Text tag="div" view="p-14">
                Confirm password
              </Text>
            </label>
            <Input
              className={classNames(styles.input, { [styles.input_error]: errors.confirmPassword })}
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword ?? ''}
              onChange={(val) => authStore.setValue('confirmPassword', val)}
              autoComplete="off"
            />
            {errors.confirmPassword && <div className={styles.error_message}>{errors.confirmPassword}</div>}
          </div>
        )}

        {errors.server && (
          <Text tag="div" weight="bold" view="p-16" className={styles.server_error_message}>
            {errors.server}
          </Text>
        )}

        <Button type="submit" disabled={isSubmitting} className={styles.button_submit}>
          <Text tag="div" view="button">
            {isSubmitting ? (!isReg ? 'Login...' : 'Register...') : !isReg ? 'Login' : 'Register'}
          </Text>
        </Button>
      </form>

      <div className={styles.switch}>
        <Text view="p-16">
          {mode === ModeValue.LOGIN ? (
            <>
              No account? <Link to={routes.register.create()}>Register</Link>
            </>
          ) : (
            <>
              Do you already have an account? <Link to={routes.login.create()}>Login</Link>
            </>
          )}
        </Text>
      </div>
    </div>
  );
};

export default observer(Auth);

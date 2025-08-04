import React from 'react';
import Auth from 'pages/Auth';
import { ModeValue } from 'store/AuthStore';

const Login: React.FC = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="container">
      <Auth mode={ModeValue.LOGIN}></Auth>
    </div>
  );
};

export default Login;

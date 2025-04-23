import React from 'react';
import Auth from 'pages/Auth';
import { ModeValue } from 'store/AuthStore';

const Register: React.FC = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="container">
      <Auth mode={ModeValue.REG}></Auth>
    </div>
  );
};

export default Register;

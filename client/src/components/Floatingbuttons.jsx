import React from 'react';
import { Link } from 'react-router-dom';
import { HomeOutlined, SettingOutlined, UserAddOutlined, LogoutOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import iconSrc from '/chitchatlogo.png';
import Auth from '../utils/auth';

const CustomIcon = () => {

  return (
    <img
      src={iconSrc}
      alt="logo"
      style={{ width: '100%', height: 'auto', margin: 'auto' }}
    />
  );
};

const Floatingbutton = () => {

  const logoutHandler = () => {
    Auth.logout();
    document.location.replace('/');
  };

  return (
    <FloatButton.Group
      trigger="hover"
      type="default"
      style={{ right: 30 }}
      icon={<CustomIcon />}
    >
    <Link to="/users">
      <FloatButton icon={<UserAddOutlined />} style={{ marginBottom: 10 }} />
    </Link>

    <Link to="/profile">
      <FloatButton icon={<SettingOutlined />} style={{ marginBottom: 10 }} />
    </Link>

    <Link to="#">
      <FloatButton onClick={logoutHandler} icon={<LogoutOutlined />} style={{ marginBottom: 10 }} />
    </Link>

    <Link to="/dashboard">
    <FloatButton icon={<HomeOutlined />} />
    </Link>
    
  </FloatButton.Group>
  );
}

export default Floatingbutton;
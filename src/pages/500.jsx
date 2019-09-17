import React from 'react';

const ServerErrorPage = () => (
  <div
    style={{
      height: '100vh',
      padding: 80,
      textAlign: 'center',
    }}
  >
    <img src="https://gw.alipayobjects.com/zos/antfincdn/wsE2Pw%243%26L/noFound.svg" alt="500" />
    <br />
    <br />
    <h1>500</h1>
    <p>权限不足，或者发生内部错误，请联系管理员.</p>
  </div>
);

export default ServerErrorPage;

/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout from '@ant-design/pro-layout';
import React, { useEffect } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import { isAntDesignPro } from '@/utils/utils';
// import logo from '../assets/logo.svg';
import logo from '../assets/logo.png';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import { setAuthority } from '../utils/authority';

/**
 * use Authorized check all menu item
 */
const menuDataRender = menuList => {
  return menuList.map(item => {
    const localItem = {
      ...item,
      children: item.children ? menuDataRender(item.children) : [],
    };
    return Authorized.check(item.authority, localItem, null);
  });
};

const footerRender = (_, defaultDom) => {
  if (!isAntDesignPro()) {
    return (
      <div></div>
      // <footer style={{ textAlign: 'center', padding: '10px' }}>
      //   Copyright&copy;2019 中电数据技术部出品
      // </footer>
    );
  }

  return <></>;
};

/***
 * 获取当前页面地址
 * @param currentPathArray
 * @returns {string|string}
 */
const currentPageNameRender = currentPathArray => {
  let pageArray = [];
  pageArray.push(<span key={new Date().getTime()}>当前位置：</span>);
  let pageName = (
    <Link to={'/'} key={'0'}>
      首页
    </Link>
  );
  pageArray.push(pageName);
  for (let i = 1; i < currentPathArray.length; i++) {
    if (!currentPathArray[i]) continue;
    let slice = currentPathArray.slice(0, i + 1);
    let pathname = slice.join('.');
    pageArray.push(
      <span style={{ width: 2 }} key={i * 10}>
        /
      </span>,
    );
    slice[0] = '';
    if (i === currentPathArray.length - 1) {
      pageArray.push(
        <Link key={i} to={slice.join('/')}>
          {formatMessage({
            id: pathname,
          })}
        </Link>,
      );
    } else {
      pageArray.push(
        <Link key={i} to={'/'}>
          {formatMessage({
            id: pathname,
          })}
        </Link>,
      );
    }
  }
  return <div>{pageArray}</div>;
};

const BasicLayout = props => {
  const { dispatch, children, settings } = props;

  let currentPath = children.props.location.pathname;
  let split = currentPath.split('/');
  split[0] = 'menu';
  let currentPageName = currentPageNameRender(split);

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
      dispatch({
        type: 'settings/getSetting',
      });
    }
  }, []);
  /**
   * init variables
   */

  const handleMenuCollapse = payload => {
    dispatch &&
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
  };

  return (
    <ProLayout
      logo={logo}
      onCollapse={handleMenuCollapse}
      menuItemRender={(menuItemProps, defaultDom) => (
        <Link to={menuItemProps.path}>{defaultDom}</Link>
      )}
      breadcrumbRender={(routers = []) => [
        {
          path: '/',
          breadcrumbName: formatMessage({
            id: 'home.menu',
            defaultMessage: 'Home',
          }),
        },
        ...routers,
      ]}
      footerRender={footerRender}
      menuDataRender={menuDataRender}
      formatMessage={formatMessage}
      rightContentRender={rightProps => <RightContent {...rightProps} />}
      {...props}
      {...settings}
    >
      {/* {currentPageName} */}
      {children}
      {/* <PageHeaderWrapper>{children}</PageHeaderWrapper> */}
    </ProLayout>
  );
};

export default connect(({ global, settings }) => ({
  collapsed: global.collapsed,
  settings,
}))(BasicLayout);


/**
 * @description 鉴权文件
 */
import React, { memo } from 'react';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';
import { Redirect } from 'react-router-dom';

interface IProps extends RouteConfigComponentProps{
}


const Auth: React.FunctionComponent<IProps> = (props) => {


  const { route, location } = props;
  const isLogin = true
  const retryTip = false


  const GlobalTip = (
    retryTip
      ?
          <p>
            请求数据多次超时， 可能会影响到后续操作，请检查网络后
            <button
              onClick={() => window.location.reload()}
            >
              刷新页面
            </button>
            !!!
          </p>
      : null
  )
  // 需要处理 判断路由
  // 如果没有登录，且不在登陆页
  if( !isLogin && location.pathname !== '/login' ) return  <Redirect to='/login' />
  // 已经登录 是否还在登录页
  if( isLogin && location.pathname === '/login' ) return <Redirect to='/' />
  // 重要的来了，在这里，判断权限.
  // if( permissions.length === 0 && isLogin ) return (
  //  <>
  //       { GlobalTip }
  //
  //       <Spin className="spin-center />
  //     </>
  // )

  return (
    <>
      { GlobalTip }
      {
        route && route.routes && renderRoutes( route.routes )
      }
    </>
  );
};

export default memo(Auth);
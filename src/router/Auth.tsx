/**
 * @description 鉴权文件
 */
import React from 'react'
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config'

type IProps = RouteConfigComponentProps

const Auth: React.FunctionComponent<IProps> = ({ route }) => {
  // 鉴权逻辑
  // if( isLogin ){
  // return <Redirect to='/' />
  // }
  return <>{route && route.routes && renderRoutes(route.routes)}</>
}
export default Auth

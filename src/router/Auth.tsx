/**
 * @description 鉴权文件
 */
import React from 'react'
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config'
import { useHistory, useLocation } from 'react-router-dom'

interface IProps extends RouteConfigComponentProps {}

const Auth: React.FunctionComponent<IProps> = ({ route }) => {
	let location = useLocation()
	let history = useHistory()
	console.log(location, 'location')
  console.log(history, 'history')
  // 鉴权逻辑
  // if( isLogin ){
  // return <Redirect to='/' />
  // }


	return (
		<>
			{route && route.routes && renderRoutes(route.routes)}
		</>
	)
}

export default Auth

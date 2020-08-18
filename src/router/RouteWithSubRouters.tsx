/***
 * @func: 返回具体的路由导航
 ***/
import React from 'react';
import { RouteConfigComponentProps } from 'react-router-config';
import { Route, Switch } from 'react-router-dom';

export default function (props: RouteConfigComponentProps) {
  const { route, match } = props;
  
  if( route ) {

    if( route.routes ) {
      return (
        <Switch>
          {
            route.routes.map( (r, i) => {
              return (
                <Route
                  key={r.key || i}
                  // 路径实际上是被拼凑出来的。
                  // 拼起来就是  /a/b/c/create
                  path={`${match.path}${r.path || ''}`}
                  exact={r.exact}
                  strict={r.strict}
                  render={(props: RouteConfigComponentProps) => {
                    if( r.render ) {
                      return r.render({...props, route: r});
                    }
                    if( r.component ) {
                      return <r.component {...props} route={r}  />
                    }

                    return null;
                  }}
                />
              )
            })
          }
        </Switch>
      )
    }

  }

  return null;
}

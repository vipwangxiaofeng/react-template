import React, { memo } from 'react';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';
interface ILayoutProps extends RouteConfigComponentProps{}

const Layout: React.FunctionComponent<ILayoutProps> = (props) => {
  const { route } = props;
  return (
    <>
    <header>
    header
    </header>
    <aside>
    aside
    </aside>
    <section>
    {
      renderRoutes(route?.routes)
    }
    </section>
    <footer>
    footer
    </footer>
    </>
  )
};

export default memo(Layout);

import React from 'react';
// eslint-disable-next-line
import {Redirect, Route} from 'react-router-dom';
// eslint-disable-next-line
import {isLogin} from 'src/helpers/utils';

// eslint-disable-next-line
interface IProps {
}

// @ts-ignore
const PublicLayout: React.FC<IProps> = ({children}) => <>{children}</>;

export default PublicLayout;

// @ts-ignore
export const PublicRoute: (any) => any = props => {
  const {component: Component, restricted, ...rest} = props;

  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    // <Route
    //   {...rest}
    //   render={(comprops) => (isLogin() && restricted && guildInfo.guildCode ? (
    //     <Redirect to={`/dashboard/overview/${guildInfo.guildCode}`} />
    //   ) : (
    //     <PublicLayout>
    //       <Component {...comprops} />
    //     </PublicLayout>
    //   ))}
    // />


    <Route
      {...rest}
      render={comprops => (
        restricted && isLogin() ? <Redirect to="/dashboard/overview"/> :
          <PublicLayout>
            <Component {...comprops} />
          </PublicLayout>
      )}
    />
  );
};

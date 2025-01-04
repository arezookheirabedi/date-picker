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
   


    <Route
      {...rest}
      render={comprops => 
        
          <PublicLayout>
            <Component {...comprops} />
          </PublicLayout>
      }
    />
  );
};

import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { isAuthenticated, isLoading, user } = useSelector(
    (state) => state.auth
  );

  return (
    <Fragment>
      {isLoading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated === false) {
              return <Redirect to='/' />;
            }

            if (isAdmin === true && user.role !== 'admin') {
              return <Redirect to='/' />;
            }

            return <Component {...props} />;
          }}
        />
      )}
    </Fragment>
  );
};

export default ProtectedRoute;

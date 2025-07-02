import Cookies from 'js-cookie'
import {Redirect, Route} from 'react-router-dom'

const ProtectedRoute = ({component: Component, ...rest}) => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return (
      <Route {...rest} render={props => <Component {...props} {...rest} />} />
    )
  }
  return <Redirect to="/login" />
}
export default ProtectedRoute

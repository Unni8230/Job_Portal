import './index.css'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {GoHome} from 'react-icons/go'
import {IoIosLogOut, IoIosNotificationsOutline} from 'react-icons/io'

const Header = props => {
  const {history} = props
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="header-container">
      <Link to="/">
        <img
          className="jobby-header-logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>
      <div className="header-menu-details-md-container">
        <div className="home-menu-link-section">
          <Link to="/">
            <p className="link-item">Home</p>
          </Link>
          <Link to="/jobs">
            <p className="link-item">Jobs</p>
          </Link>
        </div>
        <button
          type="button"
          className="header-logout-button"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </div>
      <ul className="header-menu-details-sm-container">
        <li>
          <button type="button" className="header-icons-button">
            <GoHome className="header-home-icon" />
          </button>
        </li>
        <li>
          <button type="button" className="header-icons-button">
            <GoHome className="header-home-icon" />
          </button>
        </li>
        <li>
          <button type="button" className="header-icons-button">
            <IoIosNotificationsOutline className="header-home-icon" />
          </button>
        </li>

        <button
          type="button"
          className="header-logout-sm-button"
          onClick={onClickLogout}
        >
          <IoIosLogOut className="header-home-icon" />
        </button>
      </ul>
    </div>
  )
}
export default withRouter(Header)

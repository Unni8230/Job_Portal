import './index.css'
import {Link} from 'react-router-dom'
import {BsStar} from 'react-icons/bs'
import {IoLocationOutline} from 'react-icons/io5'
import {IoIosNotificationsOutline} from 'react-icons/io'

const JobDetails = props => {
  const {Job} = props
  return (
    <Link to={`/jobs/${Job.id}`}>
      <li className="each-job-container">
        <div className="job-title-logo-rating-section">
          <img
            className="job-logo"
            src={Job.company_logo_url}
            alt="job details company logo"
          />
          <div className="job-title-rating-section">
            <h1 className="job-title">{Job.title}</h1>
            <div className="job-rating-section">
              <BsStar className="star-logo" />
              <p className="rating">{Job.rating}</p>
            </div>
          </div>
        </div>
        <div className="location-salary-section">
          <div className="location-section">
            <div className="each-logo-details-section">
              <IoLocationOutline className="location-logo" />
              <p className="job-det">{Job.location}</p>
            </div>
            <div className="each-logo-details-section">
              <IoIosNotificationsOutline className="location-logo" />
              <p className="job-det">{Job.employment_type}</p>
            </div>
          </div>
          <p className="job-salary">{Job.package_per_annum}</p>
        </div>
        <div className="job-description-section">
          <h1 className="description-title">Description</h1>
          <p className="job-description">{Job.job_description}</p>
        </div>
      </li>
    </Link>
  )
}
export default JobDetails

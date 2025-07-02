import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsStar} from 'react-icons/bs'
import {IoLocationOutline} from 'react-icons/io5'
import {IoIosNotificationsOutline} from 'react-icons/io'
import Header from '../Header'

class JobItemDetails extends Component {
  state = {
    jobItemDetails: {},
    similarJobs: [],
    isJobLoadingFailed: false,
  }

  componentDidMount() {
    this.fetchJobData()
  }

  fetchJobData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const jobDetailsApiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const jobItemResponse = await fetch(jobDetailsApiUrl, options)
    const jobItemData = await jobItemResponse.json()
    if (jobItemResponse.ok === true) {
      const jobDetails = jobItemData.job_details
      const similarJobs = jobItemData.similar_jobs
      this.setState({
        jobItemDetails: jobDetails,
        similarJobs,
      })
    } else {
      this.setState({
        isJobLoadingFailed: true,
      })
    }
  }

  render() {
    const {jobItemDetails, similarJobs, isJobLoadingFailed} = this.state
    const {skills} = jobItemDetails
    console.log(isJobLoadingFailed)
    return (
      <>
        <Header />
        <div className="job-item-details-bg-container">
          {isJobLoadingFailed && (
            <div className="jobs-failure-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
                alt="failure view"
              />
              <h1 className="no-jobs-headers">Oops! Something Went Wrong</h1>
              <p className="no-jobs-paragraph">
                We cannot seem to find the page you are looking for
              </p>
              <button type="button">Retry</button>
            </div>
          )}
          <div className="job-item-details-container">
            <div className="job-title-logo-rating-section">
              <img
                className="job-logo"
                src={jobItemDetails.company_logo_url}
                alt="job details company logo"
              />
              <div className="job-title-rating-section">
                <h1 className="job-title">{jobItemDetails.title}</h1>
                <div className="job-rating-section">
                  <BsStar className="star-logo" />
                  <p className="rating">{jobItemDetails.rating}</p>
                </div>
              </div>
            </div>
            <div className="location-salary-section">
              <div className="location-section">
                <div className="each-logo-details-section">
                  <IoLocationOutline className="location-logo" />
                  <p className="job-det">{jobItemDetails.location}</p>
                </div>
                <div className="each-logo-details-section">
                  <IoIosNotificationsOutline className="location-logo" />
                  <p className="job-det">{jobItemDetails.employment_type}</p>
                </div>
              </div>
              <p className="job-salary">{jobItemDetails.package_per_annum}</p>
            </div>
            <div className="job-description-section">
              <h1 className="description-title">Description</h1>
              <a href={jobItemDetails.company_website_url}>Visit</a>
              <p className="job-description">
                {jobItemDetails.job_description}
              </p>
            </div>
            <h1 className="skills-heading">Skills</h1>
            <ul className="skill-ul-container">
              {skills &&
                skills.map(eachSkill => (
                  <li className="skill-list-item" key={eachSkill.name}>
                    <img
                      className="skill-logo"
                      src={eachSkill.image_url}
                      alt={eachSkill.name}
                    />
                    <p className="skill-name">{eachSkill.name}</p>
                  </li>
                ))}
            </ul>
            <h1 className="skills-heading">Life at Company</h1>
            <div className="life-at-company-section">
              <p className="life-description">
                {jobItemDetails.life_at_company &&
                  jobItemDetails.life_at_company.description}
              </p>
              <img
                className="life-job-img"
                src={
                  jobItemDetails.life_at_company &&
                  jobItemDetails.life_at_company.image_url
                }
                alt=" life at company"
              />
            </div>
          </div>
          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          <ul className="skill-ul-container">
            {similarJobs &&
              similarJobs.map(eachSimilarJob => (
                <li className="similar-job-list-item" key={eachSimilarJob.id}>
                  <div className="job-title-logo-rating-section">
                    <img
                      className="job-logo"
                      src={eachSimilarJob.company_logo_url}
                      alt="job details company logo"
                    />
                    <div className="job-title-rating-section">
                      <h1 className="job-title">{eachSimilarJob.title}</h1>
                      <div className="job-rating-section">
                        <BsStar className="star-logo" />
                        <p className="rating">{eachSimilarJob.rating}</p>
                      </div>
                    </div>
                  </div>
                  <div className="job-description-section">
                    <h1 className="description-title">Description</h1>
                    <p className="job-description">
                      {eachSimilarJob.job_description}
                    </p>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </>
    )
  }
}

export default JobItemDetails

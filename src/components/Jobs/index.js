import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {IoSearchOutline} from 'react-icons/io5'
import EmploymentTypesFilter from '../EmploymentTypesFilter'
import SalaryPackageFilter from '../SalaryPackageFilter/index'
import JobDetails from '../JobDetails'
import Header from '../Header'
import Profile from '../Profile'
import './index.css'

class Jobs extends Component {
  state = {
    jobsList: [],
    employmentType: [],
    salaryPackage: '',
    search: '',
    isLoading: true,
    profileDetails: {},
    isJobListEmpty: false,
    isJobLoadingFailed: false,
    isProfileLoadingFailed: false,
  }

  componentDidMount() {
    this.fetchJobsDetails()
    this.fetchProfileDetails()
  }

  onChangeEmploymentType = id => {
    this.setState({isLoading: true})
    this.setState(
      prevState => ({
        employmentType: [...prevState.employmentType, id],
      }),
      this.fetchJobsDetails,
    )
  }

  onclickSalaryChange = id => {
    this.setState({salaryPackage: id, isLoading: true}, this.fetchJobsDetails)
  }

  changeSearchInput = event => {
    this.setState({search: event.target.value})
  }

  clickSearchButton = () => {
    this.fetchJobsDetails()
  }

  retryJob = () => {
    this.fetchJobsDetails()
  }

  retryProfile = () => {
    this.fetchProfileDetails()
  }

  fetchJobsDetails = async () => {
    this.setState({search: ''})
    const {employmentType, salaryPackage, search} = this.state
    const employmentTypeQuery = employmentType.join(',')
    const jobsUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeQuery}&minimum_package=${salaryPackage}&search=${search}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const jobsResponse = await fetch(jobsUrl, options)
    const jobsData = await jobsResponse.json()
    const {jobs} = jobsData
    this.setState({
      isLoading: false,
    })
    if (jobsResponse.ok === true) {
      if (jobs.length > 0) {
        this.setState({
          jobsList: jobs,
          isJobListEmpty: false,
        })
      } else {
        this.setState({isJobListEmpty: true})
      }
    } else {
      this.setState({
        isJobLoadingFailed: true,
      })
    }
  }

  fetchProfileDetails = async () => {
    const profileUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const profileResponse = await fetch(profileUrl, options)
    const profileData = await profileResponse.json()
    const profiles = profileData.profile_details
    this.setState({
      profileDetails: profiles,
    })
  }

  render() {
    const {employmentTypesList, salaryRangesList} = this.props
    const {
      jobsList,
      profileDetails,
      isJobListEmpty,
      isJobLoadingFailed,
      isProfileLoadingFailed,
      isLoading,
      search,
    } = this.state
    return isLoading ? (
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    ) : (
      <>
        <Header />
        <div className="jobs-main-container">
          <div className="profile-and-filters-container">
            {isProfileLoadingFailed ? (
              <button type="button" onClick={this.retryProfile}>
                Retry
              </button>
            ) : (
              <Profile profileDetails={profileDetails} />
            )}

            <div className="employment-types-container">
              <h1 className="employment-type-heading">Type of Employment</h1>
              <ul className="employment-types-ul-list">
                {employmentTypesList.map(eachType => (
                  <EmploymentTypesFilter
                    key={eachType.employmentTypeId}
                    eachType={eachType}
                    changeEmploymentType={this.onChangeEmploymentType}
                  />
                ))}
              </ul>
            </div>
            <div className="salary-ranges-container">
              <h1 className="salary-ranges-heading">Salary Range</h1>
              <ul className="salary-ranges-ul-list">
                {salaryRangesList.map(each => (
                  <SalaryPackageFilter
                    key={each.label}
                    eachRange={each}
                    label={each.label}
                    onClickSalaryChange={this.onclickSalaryChange}
                  />
                ))}
              </ul>
            </div>
          </div>
          <ul className="jobs-list-container">
            <div className="search-container">
              <input
                type="search"
                value={search}
                className="jobs-search-bar"
                placeholder="Search"
                onChange={this.changeSearchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-button"
                onClick={this.clickSearchButton}
              >
                <IoSearchOutline className="search-icon" />
              </button>
            </div>
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
                <button type="button" onClick={this.retryJob}>
                  Retry
                </button>
              </div>
            )}
            {isJobListEmpty ? (
              <div className="no-jobs-container">
                <img
                  className="no-jobs-image"
                  src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                  alt="no jobs"
                />
                <h1 className="no-jobs-heading">No Jobs Found</h1>
                <p className="no-jobs-paragraph">
                  We could not find any jobs. Try other filters
                </p>
              </div>
            ) : (
              jobsList.map(eachJob => (
                <JobDetails Job={eachJob} key={eachJob.id} />
              ))
            )}
          </ul>
        </div>
      </>
    )
  }
}
export default Jobs

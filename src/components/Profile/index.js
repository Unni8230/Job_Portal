import './index.css'

const Profile = props => {
  const {profileDetails} = props
  return (
    <div className="profile-container">
      <img
        className="profile-logo"
        src={profileDetails.profile_image_url}
        alt="profile"
      />
      <h1 className="profile-name">{profileDetails.name}</h1>
      <p className="profile-designation">{profileDetails.short_bio}</p>
    </div>
  )
}
export default Profile

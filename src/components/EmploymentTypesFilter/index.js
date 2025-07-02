import './index.css'

const EmploymentTypesFilter = props => {
  const {eachType, changeEmploymentType} = props
  const clickChangeEmployType = () => {
    changeEmploymentType(eachType.employmentTypeId)
  }
  return (
    <li className="employment-type-list-items">
      <input type="checkbox" onChange={clickChangeEmployType} />
      <p className="employment-type-text">{eachType.label}</p>
    </li>
  )
}
export default EmploymentTypesFilter

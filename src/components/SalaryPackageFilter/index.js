import './index.css'

const SalaryPackageFilter = props => {
  const {eachRange, onClickSalaryChange, label} = props
  return (
    <li className="salary-range-list-item">
      <input
        type="radio"
        id="input"
        name="salary"
        onClick={() => {
          onClickSalaryChange(eachRange.salaryRangeId)
        }}
      />
      <label htmlFor="input">{label}</label>
    </li>
  )
}
export default SalaryPackageFilter

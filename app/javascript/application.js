import "@hotwired/turbo-rails"
import "./controllers"
import mount from './mount'
import EmployeeList from './components/EmployeeList'
import Insights from './components/Insights'
import EmployeeForm from './components/EmployeeForm'
import EmployeeDetail from './components/EmployeeDetail'

document.addEventListener('turbo:load', () => {
  mount(EmployeeList, 'employee-list')
  mount(Insights, 'insights-root')
  mount(EmployeeForm, 'employee-form')
  mount(EmployeeDetail, 'employee-detail')
})

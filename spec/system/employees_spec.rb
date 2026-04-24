require 'rails_helper'

RSpec.describe "Employees", type: :system do
  before do
    driven_by(:selenium_chrome_headless)
  end

  it "renders employee pages with React mount points and server-provided props" do
    employee = create(
      :employee,
      full_name: "Alice Walker",
      job_title: "HR Specialist",
      country: "UK",
      salary: 55000,
      email: "alice.walker@example.com",
      hire_date: Date.today
    )

    visit employees_path
    expect(page).to have_content("Employees")
    expect(page).to have_css("#employee-list")

    props = JSON.parse(find("#employee-list")["data-props"])
    expect(props.fetch("employees").first.fetch("full_name")).to eq("Alice Walker")

    click_on "New employee"
    expect(page).to have_content("New employee")
    expect(page).to have_css("#employee-form")

    visit employee_path(employee)
    expect(page).to have_content("Alice Walker")
    expect(page).to have_css("#employee-detail")
  end
end

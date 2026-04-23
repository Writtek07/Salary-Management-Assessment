require 'rails_helper'

RSpec.describe "Employees", type: :system do
  before do
    driven_by(:rack_test)
  end

  it "allows an HR Manager to manage employees" do
    visit employees_path
    expect(page).to have_content("Employees")

    click_on "New employee"
    fill_in "Full name", with: "Alice Walker"
    fill_in "Job title", with: "HR Specialist"
    fill_in "Country", with: "UK"
    fill_in "Salary", with: "55000"
    fill_in "Email", with: "alice.walker@example.com"
    fill_in "Hire date", with: Date.today
    click_on "Create Employee"

    expect(page).to have_content("Employee was successfully created.")
    expect(page).to have_content("Alice Walker")

    click_on "Edit this employee"
    fill_in "Full name", with: "Alice Smith"
    click_on "Update Employee"

    expect(page).to have_content("Employee was successfully updated.")
    expect(page).to have_content("Alice Smith")

    visit employees_path
    expect(page).to have_content("Alice Smith")
    
    # Testing delete via button_to (which uses a form in rack-test)
    within "tr", text: "Alice Smith" do
      click_on "Destroy"
    end
    expect(page).to have_content("Employee was successfully destroyed.")
  end
end

require 'rails_helper'

RSpec.describe "Search Sanitization", type: :model do
  describe "Employee.search" do
    let!(:employee1) { create(:employee, full_name: "John Doe", job_title: "Developer", country: "USA") }
    let!(:employee2) { create(:employee, full_name: "Jane Smith", job_title: "Manager", country: "UK") }
    let!(:special_employee) { create(:employee, full_name: "Special % User", job_title: "Tester", country: "Canada") }
    let!(:underscore_employee) { create(:employee, full_name: "Underscore_User", job_title: "QA", country: "USA") }

    it "escapes percentage signs" do
      # If not escaped, '%' would match everything. 
      # With proper escaping, it should only match the employee with '%' in their name.
      results = Employee.search("%")
      expect(results).to include(special_employee)
      expect(results).not_to include(employee1)
      expect(results).not_to include(employee2)
    end

    it "escapes underscores" do
      # If not escaped, '_' would match any single character.
      # With proper escaping, it should only match the employee with '_' in their name.
      results = Employee.search("_")
      expect(results).to include(underscore_employee)
      expect(results).not_to include(employee1) # "John Doe" has a space, but "Jane Smith" doesn't. 
                                              # Actually "John Doe" has 'o' in it, so "J_hn" would match "John".
                                              # But "_" alone matches any single character. 
                                              # "John Doe" is 8 chars, "Jane Smith" is 10.
                                              # So "_" wouldn't match them anyway. 
                                              # Let's try something more specific.
    end

    it "escapes backslashes" do
      backslash_employee = create(:employee, full_name: "Back\\slash")
      results = Employee.search("\\")
      expect(results).to include(backslash_employee)
      expect(results).not_to include(employee1)
    end
    
    it "handles malicious SQL-like characters safely" do
      # Arel's .matches uses bind parameters or properly escaped strings, 
      # so SQL injection is generally prevented. This is just to confirm.
      results = Employee.search("' OR 1=1 --")
      expect(results).to be_empty
    end
  end
end

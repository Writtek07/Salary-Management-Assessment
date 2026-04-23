require 'rails_helper'

RSpec.describe "Insights", type: :request do
  describe "GET /insights/index" do
    before do
      create(:employee, country: "USA", job_title: "Engineer", salary: 100000)
      create(:employee, country: "USA", job_title: "Engineer", salary: 120000)
      create(:employee, country: "Canada", job_title: "Designer", salary: 80000)
    end

    it "renders a successful response and displays correct metrics" do
      get insights_index_path
      expect(response).to be_successful
      expect(response.body).to include("Salary Insights")

      # Summary metrics
      expect(response.body).to include("3") # Total employees
      expect(response.body).to include("$300,000.00") # Total payroll (100+120+80)
      expect(response.body).to include("$100,000.00") # Global avg (300/3)

      # Metrics by country (USA)
      expect(response.body).to include("USA")
      expect(response.body).to include("$100,000.00") # Min
      expect(response.body).to include("$120,000.00") # Max
      expect(response.body).to include("$110,000.00") # Avg

      # Metrics by country (Canada)
      expect(response.body).to include("Canada")
      expect(response.body).to include("$80,000.00")

      # Avg Salary by Job Title & Country
      expect(response.body).to include("Engineer")
      expect(response.body).to include("Designer")
    end
  end
end

require 'rails_helper'

RSpec.describe "Insights", type: :request do
  describe "GET /insights/index" do
    it "renders a successful response" do
      create(:employee, country: "USA", job_title: "Engineer", salary: 100000)
      get insights_index_path
      expect(response).to be_successful
      expect(response.body).to include("Salary Insights")
      expect(response.body).to include("USA")
      expect(response.body).to include("Engineer")
    end
  end
end

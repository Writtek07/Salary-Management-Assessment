require 'rails_helper'
require 'nokogiri'

RSpec.describe "Insights", type: :request do
  describe "GET /insights/index" do
    before do
      create(:employee, country: "USA", job_title: "Engineer", salary: 100000)
      create(:employee, country: "USA", job_title: "Engineer", salary: 120000)
      create(:employee, country: "Canada", job_title: "Designer", salary: 80000)
    end

    it "renders a successful response and displays correct metrics" do
      get insights_url
      expect(response).to be_successful
      expect(response.body).to include("Salary Insights")

      doc = Nokogiri::HTML(response.body)
      props_json = doc.at_css('#insights-root')&.[]('data-props')
      expect(props_json).to be_present

      props = JSON.parse(props_json)
      expect(props.fetch('total_employees')).to eq(3)

      expect(props.fetch('total_payroll').to_f).to eq(300000.0)
      expect(props.fetch('global_avg_salary').to_f).to eq(100000.0)

      salary_by_country = props.fetch('salary_by_country')
      expect(salary_by_country.fetch('USA').fetch('min')).to eq(100000)
      expect(salary_by_country.fetch('USA').fetch('max')).to eq(120000)
      expect(salary_by_country.fetch('USA').fetch('avg').to_f).to eq(110000.0)
      expect(salary_by_country.fetch('Canada').fetch('min')).to eq(80000)

      avg_salary_by_job_title_and_country = props.fetch('avg_salary_by_job_title_and_country')
      expect(avg_salary_by_job_title_and_country.fetch('USA').fetch('Engineer').to_f).to eq(110000.0)
      expect(avg_salary_by_job_title_and_country.fetch('Canada').fetch('Designer').to_f).to eq(80000.0)
    end
  end
end

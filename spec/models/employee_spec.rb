require 'rails_helper'

RSpec.describe Employee, type: :model do
  describe 'validations' do
    subject { FactoryBot.build(:employee) }

    it { should validate_presence_of(:full_name) }
    it { should validate_presence_of(:job_title) }
    it { should validate_presence_of(:country) }
    it { should validate_presence_of(:salary) }
    it { should validate_numericality_of(:salary).is_greater_than(0) }
    it { should validate_presence_of(:email) }
    it { should validate_uniqueness_of(:email).case_insensitive }
    it { should allow_value('user@example.com').for(:email) }
    it { should_not allow_value('invalid_email').for(:email) }
  end

  describe 'salary insights' do
    let!(:usa_dev) { create(:employee, country: 'USA', job_title: 'Developer', salary: 100000) }
    let!(:usa_mgr) { create(:employee, country: 'USA', job_title: 'Manager', salary: 150000) }
    let!(:uk_dev) { create(:employee, country: 'UK', job_title: 'Developer', salary: 80000) }

    describe '.by_country' do
      it 'returns salary metrics for a specific country' do
        metrics = Employee.salary_metrics_by_country('USA')
        expect(metrics[:min]).to eq(100000)
        expect(metrics[:max]).to eq(150000)
        expect(metrics[:avg]).to eq(125000)
      end
    end

    describe '.by_job_title_in_country' do
      it 'returns average salary for a job title in a country' do
        avg = Employee.avg_salary_by_job_title_in_country('Developer', 'USA')
        expect(avg).to eq(100000)
      end
    end
  end
end

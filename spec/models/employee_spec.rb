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
    it { should validate_presence_of(:hire_date) }

    it 'does not allow hire_date in the future' do
      employee = FactoryBot.build(:employee, hire_date: Date.tomorrow)
      expect(employee).not_to be_valid
      expect(employee.errors[:hire_date]).to include("can't be in the future")
    end

    it 'allows hire_date today' do
      employee = FactoryBot.build(:employee, hire_date: Date.today)
      expect(employee).to be_valid
    end

    it 'allows hire_date in the past' do
      employee = FactoryBot.build(:employee, hire_date: Date.yesterday)
      expect(employee).to be_valid
    end
  end

  describe 'salary insights' do
    let!(:usa_dev) { create(:employee, country: 'USA', job_title: 'Developer', salary: 100000) }
    let!(:usa_mgr) { create(:employee, country: 'USA', job_title: 'Manager', salary: 150000) }
    let!(:uk_dev) { create(:employee, country: 'UK', job_title: 'Developer', salary: 80000) }

    describe '.salary_metrics_by_country' do
      it 'returns salary metrics for a specific country' do
        metrics = Employee.salary_metrics_by_country('USA')
        expect(metrics[:min]).to eq(100000)
        expect(metrics[:max]).to eq(150000)
        expect(metrics[:avg]).to eq(125000)
      end

      it 'returns nil metrics for a country with no employees' do
        metrics = Employee.salary_metrics_by_country('Germany')
        expect(metrics[:min]).to be_nil
        expect(metrics[:max]).to be_nil
        expect(metrics[:avg]).to be_nil
      end
    end

    describe '.avg_salary_by_job_title_in_country' do
      it 'returns average salary for a job title in a country' do
        avg = Employee.avg_salary_by_job_title_in_country('Developer', 'USA')
        expect(avg).to eq(100000)
      end

      it 'returns nil if no matching job title and country' do
        avg = Employee.avg_salary_by_job_title_in_country('Designer', 'USA')
        expect(avg).to be_nil
      end
    end
  end
end

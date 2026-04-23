class InsightsController < ApplicationController
  def index
    @countries = Employee.distinct.pluck(:country)
    @job_titles = Employee.distinct.pluck(:job_title)

    @salary_by_country = @countries.each_with_object({}) do |country, hash|
      hash[country] = Employee.salary_metrics_by_country(country)
    end

    @avg_salary_by_job_title_and_country = @countries.each_with_object({}) do |country, hash|
      hash[country] = @job_titles.each_with_object({}) do |job_title, job_hash|
        avg = Employee.avg_salary_by_job_title_in_country(job_title, country)
        job_hash[job_title] = avg if avg
      end
    end
    
    # Additional metric: Salary distribution by job title (global)
    @global_avg_by_job_title = @job_titles.each_with_object({}) do |job_title, hash|
      hash[job_title] = Employee.where(job_title: job_title).average(:salary)
    end
  end
end

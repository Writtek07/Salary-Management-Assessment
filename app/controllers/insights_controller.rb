class InsightsController < ApplicationController
  def index
    @total_employees = Employee.count
    @total_payroll = Employee.sum(:salary)
    @global_avg_salary = Employee.average(:salary)

    @salary_by_country = Employee.group(:country).select(
      :country,
      'MIN(salary) as min_salary',
      'MAX(salary) as max_salary',
      'AVG(salary) as avg_salary'
    ).each_with_object({}) do |record, hash|
      hash[record.country] = {
        min: record.min_salary,
        max: record.max_salary,
        avg: record.avg_salary
      }
    end

    # Grouped query to avoid N+1
    grouped_averages = Employee.group(:country, :job_title).average(:salary)
    @avg_salary_by_job_title_and_country = grouped_averages.each_with_object({}) do |((country, job_title), avg), hash|
      hash[country] ||= {}
      hash[country][job_title] = avg
    end

    # Global average by job title (grouped query)
    @global_avg_by_job_title = Employee.group(:job_title).average(:salary)
  end
end

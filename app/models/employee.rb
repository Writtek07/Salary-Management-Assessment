class Employee < ApplicationRecord
  validates :full_name, presence: true
  validates :job_title, presence: true
  validates :country, presence: true
  validates :salary, presence: true, numericality: { greater_than: 0 }
  validates :email, presence: true, uniqueness: { case_sensitive: false }, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :hire_date, presence: true
  validate :hire_date_cannot_be_in_the_future

  private

  def hire_date_cannot_be_in_the_future
    if hire_date.present? && hire_date > Date.today
      errors.add(:hire_date, "can't be in the future")
    end
  end

  def self.salary_metrics_by_country(country)
    records = where(country: country)
    {
      min: records.minimum(:salary),
      max: records.maximum(:salary),
      avg: records.average(:salary)
    }
  end

  def self.avg_salary_by_job_title_in_country(job_title, country)
    where(job_title: job_title, country: country).average(:salary)
  end
end

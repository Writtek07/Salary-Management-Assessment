class AddCoveringIndexesForInsights < ActiveRecord::Migration[7.2]
  def change
    # Covering index for Employee.group(:country).average(:salary)
    add_index :employees, [ :country, :salary ]
    # Covering index for Employee.group(:job_title).average(:salary)
    add_index :employees, [ :job_title, :salary ]
    # Covering index for Employee.group(:country, :job_title).average(:salary)
    add_index :employees, [ :country, :job_title, :salary ], name: 'idx_employees_country_job_title_salary'
  end
end

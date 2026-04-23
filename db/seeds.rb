puts "Cleaning database..."
Employee.delete_all

puts "Seeding 10,000 employees..."

first_names = File.readlines(Rails.root.join("first_names.txt")).map(&:strip).reject(&:empty?)
last_names = File.readlines(Rails.root.join("last_names.txt")).map(&:strip).reject(&:empty?)

countries = ["USA", "UK", "Canada", "Germany", "France", "Japan", "Australia", "India", "Brazil", "Spain"]
job_titles = ["Software Engineer", "Senior Software Engineer", "Product Manager", "HR Manager", "Designer", "Sales Representative", "Marketing Specialist", "Data Scientist", "Customer Support", "DevOps Engineer"]

employees = []

10_000.times do |i|
  employees << {
    full_name: "#{first_names.sample} #{last_names.sample}",
    job_title: job_titles.sample,
    country: countries.sample,
    salary: Faker::Number.between(from: 30000, to: 200000),
    email: Faker::Internet.unique.email,
    hire_date: Faker::Date.between(from: 5.years.ago, to: Date.today),
    created_at: Time.current,
    updated_at: Time.current
  }

  if employees.size >= 1000
    Employee.insert_all(employees)
    employees = []
    puts "Inserted #{i + 1} employees..."
  end
end

Employee.insert_all(employees) unless employees.empty?

puts "Seeding completed! Total employees: #{Employee.count}"

FactoryBot.define do
  factory :employee do
    full_name { "John Doe" }
    job_title { "Software Engineer" }
    country { "USA" }
    salary { 75000.00 }
    sequence(:email) { |n| "employee#{n}@example.com" }
    hire_date { Date.today }
  end
end

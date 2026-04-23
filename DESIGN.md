# Design & Architecture: SalaryScale

## 1. Overview
SalaryScale is a minimal yet robust salary management tool designed for organizations with up to 10,000 employees. The primary goal is to provide HR Managers with a streamlined interface for employee management and high-level salary insights.

## 2. Architecture Decisions

### 2.1 Technology Stack
- **Frontend**: React.js (integrated via jsbundling-rails and esbuild)
- **Framework**: Ruby on Rails 7.2 (Last stable release)
- **Database**: SQLite for Local Development, we should use PostgreSQL (for production-grade data integrity), as migrations are configured for PostgreSQL.
- **CSS Framework**: Tailwind CSS (for rapid, modern UI development)
- **Testing**: RSpec, FactoryBot, Capybara, Shoulda-Matchers (for a comprehensive TDD suite)
- **Pagination**: Pagy (chosen for its exceptional performance with large datasets)

### 2.2 Data Model
The `Employee` model is the core of the application:
- `full_name`: String (Required)
- `job_title`: String (Required, indexed for search)
- `country`: String (Required, indexed for search)
- `salary`: Decimal (Precision 10, Scale 2, Required)
- `email`: String (Unique, case-insensitive, validated format)
- `hire_date`: Date

**Rationale**: We used `Decimal` for salary instead of `Float` to avoid floating-point arithmetic errors, which is critical for financial data.

### 2.3 Performance Considerations
- **Indexing**: Added a unique index on `email` and planned indexes for `country` and `job_title` to ensure fast lookups and reports.
- **Bulk Inserting**: Used `insert_all` in `seeds.rb` to populate 10,000 records in seconds, avoiding the overhead of individual model validations during mass seeding.
- **Efficient Aggregations**: Salary metrics (Min, Max, Avg) are calculated using grouped database-level aggregations (`GROUP BY`) in a single query to avoid N+1 issues, rather than loading records into memory or running nested loops.
- **Pagination**: Implemented `Pagy` which is significantly lighter and faster than `Kaminari` or `WillPaginate`, especially important for the 10,000-employee requirement.

## 3. Salary Insights Logic
The insights are derived using efficient grouped queries in the `InsightsController`:
1. **By Country**: Returns min/max/avg salary for all countries in a single grouped query.
2. **By Job Title in Country**: Provides granular average salary data using a combined `GROUP BY :country, :job_title`.
3. **Global Metrics**: High-level summary of total payroll and headcount for the HR Manager.

## 4. User Experience (UX)
- **Dashboard First**: The HR Manager is greeted with a summary of the workforce.
- **Searchability**: A unified search bar on the employee list allows filtering by Name, Title, or Country instantly.
- **Responsive Design**: The UI is mobile-friendly using Tailwind's utility classes.

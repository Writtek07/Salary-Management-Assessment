# SalaryScale: Salary Management Tool

SalaryScale is a minimal yet robust salary management application designed for HR Managers to handle large workforces (up to 10,000 employees) with ease. It provides full employee lifecycle management and high-level salary insights.

## 🚀 Quick Start

### Prerequisites
- **Ruby**: 3.2.2 (as specified in [.ruby-version](file:///Users/fci/Documents/Salary Management Assessment/.ruby-version))
- **Rails**: 7.2.3
- **Database**: PostgreSQL (Migrations configured), SQLite (Default for local development)
- **Node.js & Yarn**: For Tailwind CSS compilation

### Setup Instructions
1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd "Salary Management Assessment"
   ```

2. **Install Dependencies**:
   ```bash
   bundle install
   ```

3. **Database Setup**:
   ```bash
   rails db:prepare
   rails db:seed
   ```
   *Note: The seed file generates 10,000 employees using `Faker` and optimized bulk insertion.*

4. **Start the Development Server**:
   ```bash
   bin/dev
   ```
   *Access the app at [http://localhost:3000](http://localhost:3000)*

---

## 🛠 Features

### 1. Employee Management (CRUD)
- **Add**: Create new employee records with full name, job title, country, salary, and email.
- **View**: A paginated list of 10,000+ employees with instant search functionality.
- **Update**: Edit existing employee details.
- **Delete**: Securely remove records from the organization.

### 2. Salary Insights Dashboard
- **Country Metrics**: View Minimum, Maximum, and Average salaries grouped by country.
- **Granular Analysis**: Average salary for specific job titles within each country.
- **Organization Summary**: Global headcount, total organization payroll, and global average salary.

### 3. Advanced Search
- Real-time server-side search by **Name**, **Job Title**, or **Country** on the index page.

---

## 🧪 Testing

We maintain high code quality standards using a TDD approach with RSpec.

- **Run all tests**:
  ```bash
  bundle exec rspec
  ```
- **Test Coverage**:
  - **Models**: Validations, uniqueness, and aggregation logic.
  - **Requests**: Controller actions, routing, and HTTP status codes.
  - **System Tests**: End-to-end HR Manager workflows using Capybara.

---

## 🏗 Architecture & Design

### Technical Decisions
- **Pagination**: Implemented using [Pagy](https://ddnexus.github.io/pagy/) for superior performance with 10k records compared to Kaminari.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for a modern, responsive, and maintainable UI.
- **Performance**: Used database-level aggregations and optimized indexes to ensure sub-second response times even with large datasets.
- **Data Integrity**: Used `Decimal` for currency to avoid floating-point errors and implemented unique database-level constraints on sensitive fields like `email`.

### Artifacts
For a deeper dive into our process, please see:
- [DESIGN.md](file:///Users/fci/Documents/Salary Management Assessment/DESIGN.md): Detailed architecture and design rationale.
- [AI_COLLABORATION.md](file:///Users/fci/Documents/Salary Management Assessment/AI_COLLABORATION.md): Documentation of our AI-driven development strategy and prompts used.

---

## 👨‍💻 Developer Notes
This project was built as part of a Rails developer assignment, demonstrating:
- Strong engineering fundamentals.
- Product-centric thinking for HR personas.
- Effective use of AI tools for acceleration without compromising quality.
- Clean, production-ready Ruby on Rails code.

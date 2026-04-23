# AI Collaboration & Prompting Strategy

## 1. Approach
The development of SalaryScale was a collaborative effort between the developer and AI. The strategy focused on using AI for boilerplate generation, test case brainstorming, and performance optimization while maintaining strict control over architectural decisions.

## 2. Key Prompts & Instructions

### 2.1 TDD Implementation
The developer guided the AI to write tests *before* implementation:
> "Write an RSpec model test for Employee validating presence of name, title, country, salary, and email uniqueness."
> "Now implement the Employee model to make these tests pass."

### 2.2 Scaling & Performance
When addressing the 10,000-employee requirement:
> "We need to handle 10,000 employees. Suggest a pagination gem that is performant and show how to seed this data efficiently without hitting the database 10,000 times."
*Result: Recommendation of Pagy and use of `insert_all`.*

### 2.3 UI/UX Guidance
> "Build a modern UI using Tailwind. I want a 'Salary Insights' dashboard with summary cards for total payroll and global average."

## 3. Trade-off Discussions with AI
During development, the following trade-offs were discussed:
- **SQLite vs PostgreSQL**: AI suggested PostgreSQL for production. We configured PostgreSQL in migrations but kept SQLite for the local assessment environment for easier portability.
- **Client-side vs Server-side search**: Decided on server-side search with Pagy to handle the 10,000 records without crashing the browser.
- **Charts**: Considered adding Highcharts/Chart.js but decided to stick to a clean, tabular and card-based dashboard for the "minimal yet usable" requirement.

## 4. AI Tool Usage
- **Trae IDE**: Used for real-time code editing and codebase exploration.
- **Gemini-3-Flash**: Powering the logic, test generation, and architectural suggestions.

require 'rails_helper'

RSpec.describe "Employees", type: :request do
  let!(:employee) { create(:employee) }
  let(:valid_attributes) {
    {
      full_name: "Jane Smith",
      job_title: "Product Manager",
      country: "Canada",
      salary: 90000.00,
      email: "jane.smith@example.com",
      hire_date: Date.today
    }
  }
  let(:invalid_attributes) {
    {
      full_name: "",
      job_title: "",
      country: "",
      salary: -100,
      email: "invalid-email"
    }
  }

  describe "GET /employees" do
    it "renders a successful response" do
      get employees_path
      expect(response).to be_successful
      expect(response.body).to include(employee.full_name)
    end
  end

  describe "GET /employees/:id" do
    it "renders a successful response" do
      get employee_path(employee)
      expect(response).to be_successful
      expect(response.body).to include(employee.full_name)
    end
  end

  describe "GET /employees/new" do
    it "renders a successful response" do
      get new_employee_path
      expect(response).to be_successful
    end
  end

  describe "GET /employees/:id/edit" do
    it "renders a successful response" do
      get edit_employee_path(employee)
      expect(response).to be_successful
    end
  end

  describe "POST /employees" do
    context "with valid parameters" do
      it "creates a new Employee" do
        expect {
          post employees_path, params: { employee: valid_attributes }
        }.to change(Employee, :count).by(1)
      end

      it "redirects to the created employee" do
        post employees_path, params: { employee: valid_attributes }
        expect(response).to redirect_to(employee_path(Employee.last))
      end
    end

    context "with invalid parameters" do
      it "does not create a new Employee" do
        expect {
          post employees_path, params: { employee: invalid_attributes }
        }.to change(Employee, :count).by(0)
      end

      it "renders a successful response (i.e. to display the 'new' template)" do
        post employees_path, params: { employee: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "PATCH /employees/:id" do
    context "with valid parameters" do
      let(:new_attributes) { { full_name: "Jane Doe" } }

      it "updates the requested employee" do
        patch employee_path(employee), params: { employee: new_attributes }
        employee.reload
        expect(employee.full_name).to eq("Jane Doe")
      end

      it "redirects to the employee" do
        patch employee_path(employee), params: { employee: new_attributes }
        expect(response).to redirect_to(employee_path(employee))
      end
    end

    context "with invalid parameters" do
      it "renders a successful response (i.e. to display the 'edit' template)" do
        patch employee_path(employee), params: { employee: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "DELETE /employees/:id" do
    it "destroys the requested employee" do
      expect {
        delete employee_path(employee)
      }.to change(Employee, :count).by(-1)
    end

    it "redirects to the employees list" do
      delete employee_path(employee)
      expect(response).to redirect_to(employees_path)
    end
  end
end

class EmployeesController < ApplicationController
  before_action :set_employee, only: %i[ show edit update destroy ]

  def index
    @employees = Employee.all.order(created_at: :desc)

    if params[:query].present?
      @employees = @employees.where("full_name LIKE ? OR job_title LIKE ? OR country LIKE ?", "%#{params[:query]}%", "%#{params[:query]}%", "%#{params[:query]}%")
    end

    @pagy, @employees = pagy(@employees)
  end

  def show
  end

  def new
    @employee = Employee.new
  end

  def edit
  end

  def create
    @employee = Employee.new(employee_params)

    if @employee.save
      redirect_to employee_url(@employee), notice: "Employee was successfully created."
    else
      render :new, status: :unprocessable_entity
    end
  end

  def update
    if @employee.update(employee_params)
      redirect_to employee_url(@employee), notice: "Employee was successfully updated."
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @employee.destroy
    redirect_to employees_url, notice: "Employee was successfully destroyed."
  end

  private

  def set_employee
    @employee = Employee.find(params[:id])
  end

  def employee_params
    params.require(:employee).permit(:full_name, :job_title, :country, :salary, :email, :hire_date)
  end
end

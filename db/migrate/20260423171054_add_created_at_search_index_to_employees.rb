class AddCreatedAtSearchIndexToEmployees < ActiveRecord::Migration[7.2]
  def change
    add_index :employees, :created_at
  end
end

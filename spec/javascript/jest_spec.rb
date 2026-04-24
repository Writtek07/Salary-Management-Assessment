require "open3"

RSpec.describe "JavaScript tests" do
  it "passes Jest" do
    repo_root = File.expand_path("../..", __dir__)
    output, status = Open3.capture2e("yarn test --runInBand", chdir: repo_root)
    expect(status.success?).to eq(true), output
  end
end

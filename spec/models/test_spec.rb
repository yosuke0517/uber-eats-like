require 'rails_helper'

RSpec.describe Food, type: :model do
  it "test" do
    hoge = Food.all
    expect(hoge).to be_empty
  end
end

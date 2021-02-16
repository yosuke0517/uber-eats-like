class Order < ApplicationRecord
  has_many :line_foods # オーダーはline_foodと1対多
  has_one :restaurant, through: :line_food # オーダーはレストランと1対1の関係であること

  validates :total_price, numericality: { greater_than: 0 } # マイナスにならないように

  def save_with_update_line_foods!(line_foods)
    ActiveRecord::Base.transaction do
      line_foods.each do |line_food|
        line_food.update_attributes!(active: false, order: self)
      end
      self.save!
    end
  end
end
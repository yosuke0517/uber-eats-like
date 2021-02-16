class LineFood < ApplicationRecord
  belongs_to :food
  belongs_to :restaurant
  belongs_to :order, optional: true # orderが存在しない場合もあるためoption

  validates :count, numericality: { greater_than: 0 }

  scope :active, -> { where(active: true) } # ORマッパー（activeRecord Relation）定義
  scope :other_restaurant, -> (picked_restaurant_id) { where.not(restaurant_id: picked_restaurant_id) } # 対象の店意外のLine_foodがあった場合レコードが入ってくるように設定

  # line_foodインスタンスのfood.priceをcountでかける（合計額）
  def total_amount
    food.price * count
  end
end
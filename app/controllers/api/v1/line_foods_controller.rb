
module Api
  module V1
    class LineFoodsController < ApplicationController
      before_action :set_food, only: %i[create replace] # reactでいうbeforeCreate的な感じ？？

      def index
        # アクティブな仮注文があれば
        line_foods = LineFood.active
        if line_foods.exists?
          render json: {
            # mapはjavascriptと同じような感じ（配列を返す）
            line_food_ids: line_foods.map { |line_food| line_food.id }, # TODO idの配列かどうか確認
            restaurant: line_foods[0].restaurant,
            count: line_foods.sum { |line_food| line_food[:count] }, # TODO sumの挙動確認
            amount: line_foods.sum { |line_food| line_food.total_amount }, # total_amountメソッド（プロパティなのかメソッドなのかわかりずらい・・・）
            amount: line_foods.sum { |line_food| line_food.total_amount }, # total_amountメソッド（プロパティなのかメソッドなのかわかりずらい・・・）
          }, status: :ok
        else
          # activeな仮予約が存在しない場合は空データと204を返す
          render json: {}, status: :no_content
        end
      end

      def create
        # scopeをメソッドチェーンにて繋いで他店舗での仮予約がないかチェック
        # 選択したフードに紐づく店舗idを引数にother_restaurantで他店舗での仮予約があるか調査
        # 他店舗での仮予約があった場合、406エラーを返す
        hoge = LineFood.active.other_restaurant(@ordered_food.restaurant.id)
        print(hoge)
        if LineFood.active.other_restaurant(@ordered_food.restaurant.id).exists?
          return render json: {
            existing_restaurant: LineFood.other_restaurant(@ordered_food.restaurant.id).first.restaurant.name,
            new_restaurant: Food.find(params[:food_id]).restaurant.name,
          }, status: :not_acceptable
        end

        set_line_food(@ordered_food)

        if @line_food.save
          render json: {
            line_food: @line_food
          }, status: :created # 201
        else
          # saveに失敗した場合は500エラー
          render json: {}, status: :internal_server_error
        end
      end

      def replace
        # eachはただの繰り返し、戻り値なし
        LineFood.active.other_restaurant(@ordered_food.restaurant.id).each do |line_food|
          line_food.update_attribute(:active, false)
        end

        set_line_food(@ordered_food) # TODO 動きの確認

        if @line_food.save
          render json: {
            line_food: @line_food
          }, status: :created
        else
          render json: {}, status: :internal_server_error
        end
      end

      # プライベート（ここでしか使わない）
      private

      def set_food
        # 「＠」はグローバル変数
        @ordered_food = Food.find(params[:food_id])
      end

      def set_line_food(ordered_food)
        # すでに引数ordered_foodの仮予約が存在する場合、既存の情報をそのまま更新
        if ordered_food.line_food.present?
          @line_food = ordered_food.line_food
          # TODO この辺の中身が想像できないので確認する
          @line_food.attributes = {
            count: ordered_food.line_food.count + params[:count],
            active: true
          }
        else
          # 新規作成 「build_ + 対象モデル」
          @line_food = ordered_food.build_line_food(
            count: params[:count],
            restaurant: ordered_food.restaurant,
            active: true
          )
        end
      end
    end
  end
end
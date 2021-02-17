# railsリハビリ

# 操作
- `rails g migration CreateXXX`：マイグレーションファイル作成
- `bundle exec rails db:migrate`：マイグレーション実施
- `bundle exec rails db:seed`：テストデータ作成
- `rails console`

# モデル作成
- 外部キーの参照元（xxx_idのxxx）モデルではhas_manyなどの関連付けを行う
  - 外部キーを持っている場合、対象テーブルに対して：`belongs_to`
    - 例）仮予約（line_food）テーブルはfood, restaurant, orderについての外部キーを持っているため全てに`belongs_to`
  - 1対nの表現：`has_many`
  - 1対1の表現：`has_one`（has_one, has_manyがつけられたモデルでは対象をbelongs_toで宣言する）
    - has_one（has_many）とbelongs_toはセット
  - `scope`：返り値はActiveRecord_Relationを返すようにするべき
    
# クラスメソッドとインスタンスメソッドの使い分け
- データすべて(モデルそのもの)に対する操作はクラスメソッド。
- 特定のデータ（インスタンス）に対する操作はインスタンスメソッド。

# シェル
- 出力されたrouts一覧から、'order'が含まれる一行のみを出力する
- `$ rails routes | grep order`

# 通常メソッドと破壊的メソッドの違い
- 通常メソッド：`save`, `update`など
  - 通常メソッドで失敗するとfalseが返却される
- 破壊的メソッド：`!save`, `update!`など
  - 破壊的メソッドが失敗すると例外を返す
  
### 失敗した際に例外を拾いたいときは`破壊的メソッド`を使う

# トランザクション
- トランザクションは以下のように組み、メソッドは破壊的メソッドを使うこと

```ruby

def save_with_update_line_foods!(line_foods)
    ActiveRecord::Base.transaction do # 失敗したらロールバックさせたいのでtransactionにしている。かつ、処理では破壊的メソッドを使う
      line_foods.each do |line_food|
        line_food.update_attributes!(active: false, order: self)
      end
      self.save!
    end
end

```
    
# RSpec
- テスト記述ルールとしては、テストする内容を説明する文章を引数として、describe, context, it を使って記述する。
  - jestとほぼ同じ
- modelテスト用のファイルspec/models/test_spec.rbを作成する場合
  - `bin/rails g rspec:model test`

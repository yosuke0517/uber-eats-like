# railsリハビリ

### 操作
- `rails g migration CreateXXX`：マイグレーションファイル作成
- `bundle exec rails db:migrate`：マイグレーション実施

### モデル作成
- 外部キーの参照元（xxx_idのxxx）モデルではhas_manyなどの関連付けを行う
  - 外部キーを持っている場合、対象テーブルに対して：`belongs_to`
    - 例）仮予約（line_food）テーブルはfood, restaurant, orderについての外部キーを持っているため全てに`belongs_to`
  - 1対nの表現：`has_many`
  - 1対1の表現：`has_one`（has_oneがつけられたモデルでは対象をbelongs_toで宣言する）
    - has_oneとbelongs_toはセット
    
### クラスメソッドとインスタンスメソッドの使い分け
- データすべて(モデルそのもの)に対する操作はクラスメソッド。
- 特定のデータ（インスタンス）に対する操作はインスタンスメソッド。

    

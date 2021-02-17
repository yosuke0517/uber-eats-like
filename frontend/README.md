# railsリハビリのフロントエンド

# styled-component
- styled-componentは必ずコンポーネントの外で定義する（コンポーネント内だとレンダリングの度に無駄な初期化がされてしまう）
- styled-componentに対してpropsを渡すことができる仕組みを使う際に、onMouseMoveなど頻繁に呼ばれるコールバック内でpropsが書き換わる度にstyled-componentが初期化されてしまい、パフォーマンスの低下につながる。
  - console.warning()は出るが注意が必要
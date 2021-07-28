// pathを呼び出す(お決まり？)
// pathはNode.jsの標準モジュール
const path = require("path");

module.exports = {
  // ------mode------
  // モード値の設定
  // productionに設定すると、最適化された状態(ファイルの圧縮やモジュールの最適化)でJSファイルが出力される。本番時。
  // developmentに設定すると、ソースマップ有効(エラー表示、デバッグしやすいファイルの出力、再ビルド時間の短縮（キャッシュ有効）などの設定が有効になる。)でJSファイルが出力される。開発時。
  mode: "development",

  // ------entry------
  // webpackがビルドする際に開始点となるJSファイルを設定
  // メインとなるJavaScriptファイル(エントリーポイントorエントリーファイル)
  // フルパスで書くのが望ましい
  // __dirnameはNode.jsで用意されているグローバル変数で、現在進行中のソースコードが格納されている
  // お手軽に絶対パスの記述ができる優れもの！
  entry: path.join(__dirname, "src/js/app.js"),
  // ------output------
  // ビルドファイルの設定
  // どこにどのようなファイルを出力すればよいか設定
  output: {
    // どのディレクトリに出力するか
    path: path.join(__dirname, "dist/js"),
    // どのファイルに出力するか
    filename: "bundle.js",
  },
  // ------module------
  // プロジェクト内のさまざまなタイプのモジュールがどのように処理されるかを設定
  // 「webpackが特定のmoduleをどう扱うか」を決める
  // webpackでは、moduleはJavaScriptやCSSなどのファイルを指す
  module: {
    // ------rules------
    // 変換処理
    // 変換処理を行うモジュールのことをwebpackではloaderと呼ぶ
    // loadersとrulesの違い
    // rulesの方が新しい。loadersは古いため、rulesを推奨。
    rules: [
      {
        // ------test------
        // 変換するファイルを特定
        // testプロパティに拡張子を指定して、あるLoaderがどのような種類のファイルを処理するべきなのか特定する(正規表現で拡張子を指定)
        // 「/\.js$/」は正規表現。「.js」で終わるファイル、つまりはJavaScriptファイルを表します。
        test: /\.js$/,
        // ------include, exclude------
        // ビルド対象に含める／除外するファイルを指定します。正規表現が使えます。
        // exclude→ローダーの処理対象から外すディレクトリ
        exclude: /node_modules/,
        // ------use------
        // 変換に使うLoaderを指定
        // useプロパティにLoaderを指定して、testプロパティに指定したファイルがアプリケーションの依存関係や最終的なbundleファイルに加えられるように変換する
        use: [
          {
            // ------loader または loaders
            // 適用する loader の名前を指定します。
            // xxx-loader の -loader 部分は省略可能です。
            // ローダーは、右から左（または下から上）に評価/実行される
            loader: "babel-loader",
            // ------options------
            // 使用するLoaderのオプション
            // queryはサポートされているが、廃止された
            // 今回はbabelのオプションを指定している
            options: {
              // プリセットの指定
              // modules:falseはimport/export構文が別の構文に変換されないように設定している
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        ],
      },
    ],
  },
  // ------resolve------
  // webpack には import を使ってモジュールをインポートする際に、指定されたモジュールを検索して該当するファイルを探す仕組みがある
  // resolve オプションはモジュール解決（モジュールの import を解決する仕組み）の設定を変更します。
  resolve: {
    // resolve.modules
    // モジュールを解決するときに検索するディレクトリを webpack に指示します。
    // デフォルトは node_modules です。
    modules: [path.join(__dirname, "src"), "node_modules"],
    // resolve.extensions
    // このオプションで指定されている拡張子のファイルは import の際に拡張子を省略することができます。
    // 省略する対象の拡張子を配列で指定します。これらの値を書き換えるとデフォルトを上書きすることになります。
    extensions: [".js"],
    alias: {
      // インストールしたvueはtemplate機能のないランタイム限定ビルドのため、エイリアスを貼る
      vue: 'vue/dist/vue.esm.js'
    }
  },
};

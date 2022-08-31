# IFRO WEB SITE / IPRON Client

IFROオフィシャルのイプロン・クライアントです。

## 実行
```shell
$ yarn or npm install
$ yarn start
```
### 環境変数

```.env
REACT_APP_API_URL=https://api.ifro.ai/v1
REACT_APP_PROJECT_KEY=プロジェクト・キー
REACT_APP_PROJECT_SECRET=プロジェクト・シークレット
REACT_APP_GTM_ID=GTMID
```
* __REACT_APP_API_URL__
  * APIのURLになります。（https://api.ifro.ai/v1）
* __REACT_APP_PROJECT_KEY / REACT_APP_PROJECT_SECRET__
  * キーとシークレット。プロジェクト作成画面から取得して下さい。
* __REACT_APP_GTM_ID__
  * `https://ifro.ai`で実働しているので入っていますが、空で問題有りません。

### フォルダ構成

## メッセージの受信

IFROはAPIの`/clients/projects/forwards`をPOSTで呼ぶ事と、現在のユーザーに必要なメッセージを返します。呼ぶ度にノードを進めてくれるので、フロントでは現在の状態を考える必要はありません。

今回は`swr`を使ってAPIを呼んでいます。キャッシュを使用せずに`mutate`を使うことで、同じURLを呼び出し最新の結果を取得しています。
リアクティブに結果を取得出来るので、`useEffect`を使って結果が変わる度に処理を行うようにしています。

### メッセージのタイプ
IFROでは管理画面上のツリーに沿う形でメッセージが送られてきます。
* 機能メッセージ  
ユーザーにフィードバックが必要ないメッセージ
* 発話メッセージ  
IFRO側から任意の発話を行うメッセージ
* 聞き取りメッセージ  
ユーザーのフィードバックを必要とするメッセージ  
例：自由入力・選択肢からの入力など

機能メッセージ、発話メッセージの場合は、次のメッセージを取得するために`/clients/projects/forwards`をリクエストします。
タイプはレスポンスの`data.attributes.client_action_type`から取得する事が出来ます。

### メッセージの送信

スレッドを進める`/clients/projects/forwards`に`client_message`パラメーターを追加します。IFROは聞き取りを文字列で行うので、選択肢モジュールを使った場合も、値（文字列）をユーザーの発話として送ります。


### メッセージ・スレッドを先頭に戻す

画面を開いた時などにスレッドを初期位置に戻したい場合は`/clients/projects/forwards`を呼ぶと初期位置から会話を開始する事が出来ます。


## メッセージの表示処理

不要になったメッセージの非表示処理を行っているので、メッセージのデータ用と表示用に２つのステートを使っています。

```js
// メッセージデータ
const [messages, setMessages] = useState<MESSAGE_TYPE[]>([])
// 表示するメッセージ用の配列
const [visibleMessages, setVisibleMessages] = useState<string[]>([])
```

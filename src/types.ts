/* General Types */
export type Maybe<T> = T | null         // 値なし(null)の可能性がある場合
export type Finally<T> = T | undefined  // 変数宣言時の初期値がないだけで、処理中に値が必ず入るべき場合

/* Configuration Data Types */
export type Region = "50yrs" | "75yrs" | "jpn"

/* Country Data Types:
    Implemented only places where some registered was there */
export type Country
  = "arg" // アルゼンチン
  | "aut" // オーストリア
  | "bra" // ブラジル
  | "che" // スイス
  | "cze" // チェコ
  | "deu" // ドイツ
  | "dnk" // デンマーク
  | "esp" // スペイン
  | "fin" // フィンランド
  | "fra" // フランス
  | "gbr" // イギリス
  | "hun" // ハンガリー
  | "ita" // イタリア
  | "pol" // ポーランド
  | "pry" // パラグアイ
  | "nld" // オランダ
  | "nor" // ノルウェー
  | "rus" // ロシア
  | "usa" // アメリカ

/* Personal Data Types */
export type PName = {
  lang: string
  last: string
  given: string
}
export type PDate = {
  year: number
  month: number
  day: number
}
export type ComposersJSON = {
  id: number
  name: PName[]
  birth: PDate
  death: PDate
  country: Country[]
}

/* Configuration Types */
export type ResultLang = "eng" | "jpn"
/*
export type Configuration = {
  region: Region
  lang: ResultLang
}
*/

/* Result Data Types */
export type SummaryExpiration
  = "placeholder"   // placeholder
  | "pd"            // public domain (almost surely)
  | "non-pd"        // not public domain (basically for all works)
  | "partial-pd"    // partially public domain (for some works)

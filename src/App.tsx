import { useState } from 'react'
import { DateTime, Duration } from 'luxon'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fas } from '@fortawesome/free-solid-svg-icons'
// import { far } from '@fortawesome/free-regular-svg-icons'
// import { fab } from '@fortawesome/free-brands-svg-icons'
// library.add(fas, far, fab)
// import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons'

import {
  // General Types
  type Maybe, type Finally,
  // Configuration Data Types
  type Region, 
  // Personal Data Types
  type PName, type PDate, type ComposersJSON, 
  // Result Data Types
  type SummaryExpiration,
  type Country,
  type ResultLang,
} from './types.ts'
import './styles/App.css'
import Composers from './data/composers.json'

function App() {
  type ComposerResult = {
    id: number
    name: PName
    birth: PDate
    death: PDate
    expiration: PDate
    summary: SummaryExpiration
  }

  const judgeExpirationSummary = (reg: Region, ds: PDate[]) => {
    if (ds.length === 0) {
      throw "Invalid argument: empty dates (@ judgeExpirationSummary)"
    }
    const dd = ds.map((d) => d as DateTime)
    const earliest_dd = dd.reduce((a, b) => a < b ? a : b)
    const latest_dd = dd.reduce((a, b) => a > b ? a : b)
    const today = DateTime.now()
    let smry: Finally<SummaryExpiration>
    switch(reg) {
      case "50yrs":
      case "75yrs":
        smry = (today > latest_dd) ? "pd" : "non-pd"
        break
      case "jpn":
        if (today > latest_dd) smry = "pd"
        else if (today < earliest_dd) smry = "non-pd"
        else smry = "partial-pd"
        break
      default:
        smry = "placeholder"
        break
    }
    if (smry === undefined) {
      throw "Invalid argument: Resulting no summary (@ judgeExpirationSummary)"
    }
    return smry as SummaryExpiration
  }
  const summaryString = (smry: SummaryExpiration) => {
    let s: string = "(PLACEHOLDER)"
    switch(smry) {
      case "pd":
        s = "PD";break
      case "non-pd":
        s = "non-PD";break
      case "partial-pd":
        s = "partial-PD";break
      case "placeholder":
      default:
        break
    }
    return s
  }

  const [query_name, setQueryName] = useState<string>('')
  const [config_region, setConfigRegion] = useState<Region>("jpn")
  const [config_result_lang, setConfigResultLang] = useState<ResultLang>("jpn")

/*
  const config: Configuration = {
    region: config_region
  }
*/
  const composersList = Composers as ComposersJSON[]
  const composersResultList: ComposerResult[]
    = composersList
        .filter((person) => {
          if (query_name.trim() === '') return false;
          else return person.name.some((n) => `${n.given} ${n.last}`.toLowerCase().includes(query_name.toLowerCase()));
        })
        .map((person) => {
          const ds_expire: DateTime[] = calcExpiration(config_region, person.country, person.birth, person.death)
          const d_expire: DateTime = ds_expire.reduce((a, b) => a > b ? a : b)
          let p_name: Finally<PName>;
          switch(config_result_lang) {
            case "jpn":
              p_name = person.name.find((name) => name.lang === "ja")
              break
            case "eng":
              p_name = person.name[0]
              break
            default:
              p_name = person.name[0]
              break
          }
          if (p_name === undefined) {
            throw "Invalid argument (in constructing composerResultList): config_result_lang = "+config_result_lang
          }
          const ret: ComposerResult = {
            id: person.id,
            name: p_name,
            birth: person.birth,
            death: person.death,
            expiration: d_expire as PDate,
            summary: judgeExpirationSummary(config_region, ds_expire as PDate[])
          };
          return ret;
        });

//  const element_icon_question = <FontAwesomeIcon icon={faCircleQuestion} />
  return (
    <div id="app">
      <hgroup>
        <h1>作曲家PDチェッカー</h1>
        <p>作曲家の生没年と国籍から、著作権の存続期間を判定します。</p>
      </hgroup>
      <div id="disclaimer">
        <h2>免責事項</h2>
        <p>本ツールは法的なアドバイスを提供するものではありません。あくまで参考情報としてご利用ください。</p>
      </div>
      <div id="app-main">
        <form id="form-name" name="search-by-name" accessKey="q">
          <fieldset id="field-region">
            <legend>適用ルール</legend>
            <div className="items">
              <div className="field-item">
                <label htmlFor="region-jpn">日本:</label>
                <input type="radio" defaultChecked name="region" value="jpn" id="region-jpn" onChange={() => setConfigRegion("jpn")} />
              </div>
              <div className="field-item">
                <label htmlFor="region-50yrs">50年:</label>
                <input type="radio" name="region" id="region-50yrs" onChange={() => setConfigRegion("50yrs")} />
              </div>
              <div className="field-item">
                <label htmlFor="region-75yrs">75年:</label>
                <input type="radio" name="region" value="75yrs" id="region-75yrs" onChange={() => setConfigRegion("75yrs")} />
              </div>
            </div>
          </fieldset>
          <label htmlFor="name">作曲家の名前:</label>
          <input type="text" id="name" name="name" onChange={(e) => {setQueryName(e.target.value)}}></input>
        </form>
        <form id="form-dates" name="search-by-names" accessKey="d">
          <div className="field-item">
            <label htmlFor="dates-mode">日付を直接入力:</label>
            <input type="checkbox" disabled name="switch-dates-mode" id="dates-mode" />
          </div>
        </form>
        <div id="result">
          <h2>検索結果</h2>
          <p>検索クエリ: <span id="show-query">{query_name}</span></p>
          <div id="field-result-lang">
            <label htmlFor="result-lang-jpn">名前をカナで表示する:</label>
            <input type="checkbox" defaultChecked id="result-lang-jpm" name="result-lang" value="jpn" onChange={(e) => {setConfigResultLang((e.target.checked) ? "jpn" : "eng")}} />
          </div>
          <div id="result-list">
            {composersResultList
              .map((person) => (
                <div key={`result-${person.id}`} className="result-item">
                  <div className="result-heading">
                    <span className="familyname">{person.name.last},</span> {person.name.given}
                  </div>
                  <div className="result-details">
                    <div className="summary">
                      <span className={`result-summary-${person.summary}`}>{summaryString(person.summary)}</span>
                    </div>
                    <div className="expiration">
                      <div className="label">保護期間終了日</div>
                      <div className="date">{person.expiration.year}-{person.expiration.month.toString().padStart(2,'0')}-{person.expiration.day.toString().padStart(2,'0')}</div>
                    </div>
                    <div className="lifetime">
                      <div className="birth">
                        <div className="label">出生日</div>
                        <div className="date">{person.birth.year}-{person.birth.month.toString().padStart(2, '0')}-{person.birth.day.toString().padStart(2, '0')}</div>
                      </div>
                      <div className="death">
                        <div className="label">死亡日</div>
                        <div className="date">{person.death.year}-{person.death.month.toString().padStart(2, '0')}-{person.death.day.toString().padStart(2, '0')}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        {(import.meta.env.DEV) ? (
          // 開発モードのみ: 全作曲家リスト
          <div id="composers-list">
            <div className="wrapper">
              <h2>Composers List</h2>
              <table>
                <colgroup>
                  <col className="composer-id" />
                  <col className="composer-name" />
                  <col className="composer-birth" />
                  <col className="composer-death" />
                </colgroup>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Birth</th>
                    <th>Death</th>
                  </tr>
                </thead>
                <tbody>
                  {composersList.map((person) => (
                    <tr key={`list-${person.id}`}>
                      <td>{person.id}</td>
                      <td>
                        {person.name[0].last}, {person.name[0].given}
                      </td>
                      <td>
                        {person.birth.year}-{person.birth.month.toString().padStart(2, '0')}-{person.birth.day.toString().padStart(2, '0')}
                      </td>
                      <td>
                        {person.death.year}-{person.death.month.toString().padStart(2, '0')}-{person.death.day.toString().padStart(2, '0')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default App

// ========================================================================

const calcMostExpandedWartime_jpn = (ctr: Country, birth: PDate, death: PDate) => {
  // memo: 簡単のため、最大の戦時加算（と見積もられる日数）のみを返値としている
  const bd: DateTime = DateTime.fromObject(birth)
  const dd: DateTime = DateTime.fromObject(death)
  let ds: Maybe<Duration> = null
  /* 戦時加算日数
    オーストリア: なし (当時ドイツに併合されていたため)
    スイス: なし（中立国）
    ドイツ: なし（制度はあったが、著作権延長の申出がなかったため）
    フランス: 8年120日もしくは14年272日（フランス知的所有権法典第123の8条・9条に基づく）
    イギリス: 3794日
    イタリア: 6年（イタリア平和条約第15条付属書に基づく）
    オランダ: 3844日
    ロシア: なし（サンフランシスコ平和条約非署名）
    アメリカ: 3794日
   */
  if (dd.plus({ years: 50 }).year >= 1941) {
    if (ctr === "fra" && bd < DateTime.fromObject({ year: 1914, month: 8, day: 2 })) {
      ds = Duration.fromObject({ year: 14, day: 272 })
    } else if (ctr === "nld") {
      ds = Duration.fromObject({ day: 3844 })
    } else if (ctr === "gbr" || ctr === "usa") {
      ds = Duration.fromObject({ day: 3794 })
    } else if (ctr === "fra" && bd < DateTime.fromObject({ year: 1939, month: 9, day: 3 })) {
      ds = Duration.fromObject({ year: 8, day: 120 })
    } else if (ctr !== "ita") {
      ds = Duration.fromObject({ day: 0 })
    }
  }
  if (bd < DateTime.fromObject({ year: 1947, month: 9, day: 15 }) && dd.plus({ years: 50 }).year >= 1947 && ctr === "ita" && (ds === null || ds < Duration.fromObject({ year: 6 }))) {
    ds = Duration.fromObject({ year: 6 })
  } else if (ctr === "ita" && ds === null) {
    ds = Duration.fromObject({ day: 0 })
  }
  return ds
}
const calcExpiration = (reg: Region, cts: Country[], birth: PDate, death: PDate) => {
  const bd: DateTime = DateTime.fromObject(birth)
  const dd: DateTime = DateTime.fromObject(death)
  let expd: DateTime[] | undefined = undefined
  let wartime_extension: Maybe<Duration>[] = []

  // const bod = { hour: 0, minute: 0, second: 0, millisecond: 0 }
  const eod = { hour: 23, minute: 59, second: 59, millisecond: 999 }

  //const date_decl_pacific_war: DateTime = DateTime.fromObject({ year: 1941, month: 12, day: 8 })
  //const date__tpp_extension: DateTime = DateTime.fromObject({ year: 2018, month: 12, day: 30 })

  switch(reg) {
    case "50yrs":
      expd = [dd.plus({ years: 50 }).set({ month: 12, day: 31}).set(eod)];
      break;
    case "75yrs":
      expd = [dd.plus({ years: 75 }).set({ month: 12, day: 31 }).set(eod)];
      break;
    case "jpn":
      if (bd.year <= 1980 && dd.plus({ years: 50 }).year >= 1941) {
        wartime_extension = cts.map((ct) => {
          return calcMostExpandedWartime_jpn(ct, birth, death)
        })
      } else if (dd.plus({ years: 50 }).year >= 1919) {
        wartime_extension = cts.includes("fra") ? [Duration.fromObject({ year: 6, day: 152 })] : []
      }

      if (wartime_extension.length === 0) {
        if (dd.plus({ years: 50 }).year >= 2018) {
          expd = [dd.plus({ years: 70 }).set({ month: 12, day: 31 }).set(eod)]
        } else {
          expd = [dd.plus({ years: 50 }).set({ month: 12, day: 31 }).set(eod)]
        }
      } else {
        expd = wartime_extension.map((ds) => {
          if (dd.plus({ years: 50 }).plus(ds ?? { day: 0 }).year >= 2018) {
            return dd.plus({ years: 70 }).set({ month: 12, day: 31 }).plus(ds ?? { day: 0 }).set(eod)
          } else {
            return dd.plus({ years: 50 }).set({ month: 12, day: 31 }).plus(ds ?? { day: 0 }).set(eod)
          }
        })
      }
      break;
    default:
      break;
  }
  if (expd == undefined) {
    throw "Invalid argument (@ calcExpiration)";
  }

  return expd as DateTime[];
}

import { useState } from 'react'
import { DateTime } from 'luxon'
import './App.css'
import Composers from './data/composers.json'

function App() {
  type Region = "50yrs" | "75yrs" | "jpn"
/*
  type Configuration = {
    region: Region
  }
*/
  type PName = {
    lang: string
    last: string
    given: string
  }
  type PDate = {
    year: number
    month: number
    day: number
  }
  type ComposersJSON = {
    id: number,
    name: PName[]
    birth: PDate
    death: PDate
  }
  type ComposerResult = {
    id: number
    name: PName[]
    birth: PDate
    death: PDate
    expiration: PDate
  }

  const calcExpiration = (reg: Region, d: PDate) => {
    const dd: DateTime = DateTime.fromObject(d);
    let expd: DateTime | null = null;
    switch(reg) {
      case "50yrs":
        expd = dd.plus({ years: 50 }).set({ month: 12, day: 31 });
        break;
      case "75yrs":
        expd = dd.plus({ years: 75 }).set({ month: 12, day: 31 });
        break;
      case "jpn":
        // Not implemented
        break;
      default:
        break;
    }
    if (expd == null) {
      throw "Invalid argument";
    }
    const result: PDate = {
      year: expd.year,
      month: expd.month,
      day: expd.day
    }
    return result;
  }

  const [query_name, setQueryName] = useState<string>('')
  const [config_region, setConfigRegion] = useState<Region>("75yrs")

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
          const ret: ComposerResult = {
            id: person.id,
            name: person.name,
            birth: person.birth,
            death: person.death,
            expiration: calcExpiration(config_region, person.death)
          };
          return ret;
        });

  return (
    <div id="app">
      <form id="form-name" name="search-by-name" accessKey="q">
        <fieldset id="field-region">
          <legend>適用地域</legend>
          <label htmlFor="region-50yrs">50年:</label>
          <input type="radio" name="region" id="region-50yrs" onChange={() => setConfigRegion("50yrs")} />
          <label htmlFor="region-75yrs">75年:</label>
          <input type="radio" defaultChecked name="region" value="75yrs" id="region-75yrs" onChange={() => setConfigRegion("75yrs")} />
          <label htmlFor="region-jpn">日本 (未実装):</label>
          <input type="radio" disabled name="region" value="jpn" id="region-jpn" />
        </fieldset>
        <label htmlFor="name">作曲家の名前:</label>
        <input type="text" id="name" name="name" onChange={(e) => {setQueryName(e.target.value)}}></input>
      </form>
      <div id="result">
        <h2>検索結果</h2>
        <p>検索クエリ: <span id="show-query">{query_name}</span></p>
        <div id="result-list">
          {composersResultList
            .map((person) => (
              <div key={`result-${person.id}`} className="result-item">
                <div className="result-heading">
                  <span className="familyname">{person.name[0].last},</span> {person.name[0].given}
                </div>
                <div className="result-details">
                  <div className="summary">
                    <span className="result-summary-placeholder">(PLACEHOLDER)</span>
                  </div>
                  <div className="expiration">
                    <div className="label">Expiration</div>
                    <div className="date">{person.expiration.year}-{person.expiration.month.toString().padStart(2,'0')}-{person.expiration.day.toString().padStart(2,'0')}</div>
                  </div>
                  <div className="lifetime">
                    <div className="birth">
                      <div className="label">Birth</div>
                      <div className="date">{person.birth.year}-{person.birth.month.toString().padStart(2, '0')}-{person.birth.day.toString().padStart(2, '0')}</div>
                    </div>
                    <div className="death">
                      <div className="label">Death</div>
                      <div className="date">{person.death.year}-{person.death.month.toString().padStart(2, '0')}-{person.death.day.toString().padStart(2, '0')}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
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
    </div>
  )
}

export default App

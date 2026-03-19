import { useState } from 'react'
import './App.css'
import Composers from './data/composers.json'

function App() {
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
  type Person = {
    id: number,
    name: PName[]
    birth: PDate
    death: PDate
  }

  const sampleList = Composers as Person[]

  const [query_name, setQueryByName] = useState<string>('');

  return (
    <div id="app">
      <form id="form-name" name="search-by-name" accessKey="q">
        <label htmlFor="name">作曲家の名前:</label>
        <input type="text" id="name" name="name" onChange={(e) => setQueryByName(e.target.value)}></input>
      </form>
      <div id="result">
        <h2>検索結果</h2>
        <p>検索クエリ: <span id="show-query">{query_name}</span></p>
        <div id="result-list">
          {sampleList
            .filter((person) => person.name.some((n) => `${n.given} ${n.last}`.toLowerCase().includes(query_name.toLowerCase())))
            .map((person) => (
              <div key={`result-${person.name[0].last}`} className="result-item">
                <div className="result-heading">
                  <span className="familyname">{person.name[0].last},</span> {person.name[0].given}
                </div>
                <div className="result-details">
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
            {sampleList.map((person) => (
              <tr key={`list-${person.name[0].last}`}>
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
  )
}

export default App

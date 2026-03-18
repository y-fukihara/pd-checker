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

  return (
    <div id="app">
      <h1>作曲家PDチェッカー</h1>
      <h2>Composers List</h2>
      <div>
        <table>
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
              <tr key={person.name[0].last}>
                <td>{person.id}</td>
                <td>
                  {person.name[0].last}, {person.name[0].given}
                </td>
                <td>
                  {person.birth.year}-{person.birth.month}-{person.birth.day}
                </td>
                <td>
                  {person.death.year}-{person.death.month}-{person.death.day}
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

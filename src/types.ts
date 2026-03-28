/* Configuration Data Types */
export type Region = "50yrs" | "75yrs" | "jpn"

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
  id: number,
  name: PName[]
  birth: PDate
  death: PDate
}
/*
  type Configuration = {
    region: Region
  }
*/

/* Result Data Types */
export type SummaryExpiration
  = "placeholder"   // placeholder
  | "pd"            // public domain (almost surely)
  | "non-pd"        // not public domain (basically for all works)

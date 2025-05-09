export enum Regions {
  ChanghuaCounty = "CHA",
  ChiayiCounty = "CYQ",
  HsinchuCounty = "HSQ",
  HualienCounty = "HUA",
  YilanCounty = "ILA",
  KinmenCounty = "KIN",
  LienchiangCounty = "LIE",
  MiaoliCounty = "MIA",
  NantouCounty = "NAN",
  PenghuCounty = "PEN",
  PingtungCounty = "PIF",
  TaitungCounty = "TTT",
  YunlinCounty = "YUN",
  ChiayiCity = "CYI",
  HsinchuCity = "HSZ",
  KeelungCity = "KEE",
  KaohsiungCity = "KHH",
  NewTaipeiCity = "NWT",
  TaoyuanCity = "TAO",
  TainanCity = "TNN",
  TaipeiCity = "TPE",
  TaichungCity = "TXG",
}

export type Region = `${Regions}`

export const RegionsSupported: Array<Region> = [
  Regions.TaipeiCity,
  Regions.NewTaipeiCity,
] as const

export const DefaultRegion = Regions.TaipeiCity

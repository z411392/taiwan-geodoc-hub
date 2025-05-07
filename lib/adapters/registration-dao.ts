export enum RegistrationStatuses {
  Pending = "pending",
  Parsing = "parsing",
  Success = "success",
  Failed = "failed",
}

export type RegistrationStatus = `${RegistrationStatuses}`

export enum ParcelTypes {
  Land = "land",
  Building = "building",
}

export type ParcelType = `${ParcelTypes}`

export interface Registration {
  id: string
  snapshotId: string
  city: string
  district: string
  section: string
  parcelType: ParcelType
  parcelNumber: string
  status: RegistrationStatus
  text: string
  json: unknown
}

export class RegistrationDao {
  constructor({
    tenantId: _tenantId,
    snapshotId: _snapshotId,
  }: {
    tenantId: string
    snapshotId: string
  }) {}
  async all(): Promise<Registration[]> {
    const text = `
    123
    456
    `
    return [
      {
        id: "1",
        snapshotId: "1",
        city: "新北市",
        district: "板橋區",
        section: "板橋段",
        parcelType: `${ParcelTypes.Land}`,
        parcelNumber: "123-4",
        status: `${RegistrationStatuses.Success}`,
        text: text,
        json: {},
      },
      {
        id: "2",
        snapshotId: "1",
        city: "新北市",
        district: "板橋區",
        section: "板橋段",
        parcelType: `${ParcelTypes.Building}`,
        parcelNumber: "456",
        status: `${RegistrationStatuses.Parsing}`,
        text: text,
        json: {},
      },
      {
        id: "3",
        snapshotId: "1",
        city: "新北市",
        district: "板橋區",
        section: "板橋段",
        parcelType: `${ParcelTypes.Land}`,
        parcelNumber: "125-1",
        status: `${RegistrationStatuses.Pending}`,
        text: text,
        json: {},
      },
      {
        id: "4",
        snapshotId: "1",
        city: "新北市",
        district: "板橋區",
        section: "板橋段",
        parcelType: `${ParcelTypes.Building}`,
        parcelNumber: "789",
        status: `${RegistrationStatuses.Failed}`,
        text: text,
        json: {},
      },
      {
        id: "5",
        snapshotId: "1",
        city: "新北市",
        district: "板橋區",
        section: "板橋段",
        parcelType: `${ParcelTypes.Land}`,
        parcelNumber: "127",
        status: `${RegistrationStatuses.Success}`,
        text: text,
        json: {},
      },
      {
        id: "6",
        snapshotId: "1",
        city: "新北市",
        district: "板橋區",
        section: "板橋段",
        parcelType: `${ParcelTypes.Building}`,
        parcelNumber: "890",
        status: `${RegistrationStatuses.Pending}`,
        text: text,
        json: {},
      },
      {
        id: "7",
        snapshotId: "1",
        city: "新北市",
        district: "板橋區",
        section: "板橋段",
        parcelType: `${ParcelTypes.Land}`,
        parcelNumber: "128-2",
        status: `${RegistrationStatuses.Failed}`,
        text: text,
        json: {},
      },
      {
        id: "8",
        snapshotId: "1",
        city: "新北市",
        district: "板橋區",
        section: "板橋段",
        parcelType: `${ParcelTypes.Building}`,
        parcelNumber: "991",
        status: `${RegistrationStatuses.Success}`,
        text: text,
        json: {},
      },
      {
        id: "9",
        snapshotId: "1",
        city: "新北市",
        district: "板橋區",
        section: "板橋段",
        parcelType: `${ParcelTypes.Land}`,
        parcelNumber: "129",
        status: `${RegistrationStatuses.Pending}`,
        text: text,
        json: {},
      },
      {
        id: "10",
        snapshotId: "1",
        city: "新北市",
        district: "板橋區",
        section: "板橋段",
        parcelType: `${ParcelTypes.Building}`,
        parcelNumber: "992",
        status: `${RegistrationStatuses.Success}`,
        text: text,
        json: {},
      },
    ]
  }
}

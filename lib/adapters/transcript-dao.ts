export enum TranscriptStatuses {
  Pending = "pending",
  Failed = "failed",
  Processing = "processing",
  Success = "success",
}

export type TranscriptStatus = `${TranscriptStatuses}`

export interface Transcript {
  id: string
  filename: string
  uploadDate: string
  status: TranscriptStatus
  attempts: number
  fileSize: string
  uploader: string
  downloadJson: boolean
  downloadExcel: boolean
  points: number
  jsonContent: unknown
}

export class TranscriptDao {
  constructor({ tenantId: _tenantId }: { tenantId: string }) {}

  async byPage({
    status: _status,
    keyword: _keyword,
    page: _page,
  }: {
    status?: TranscriptStatuses
    keyword: string
    page: number
  }) {
    const transcripts: Transcript[] = [
      {
        id: "1",
        filename: "台北市大安區xxx.pdf",
        uploadDate: "2023/12/20",
        status: `${TranscriptStatuses.Success}`,
        attempts: 1,
        fileSize: "2.5 MB",
        uploader: "張小明",
        downloadJson: true,
        downloadExcel: true,
        points: 2,
        jsonContent: {
          address: "台北市大安區XX路123號",
          owner: "王小明",
          area: "50.25平方公尺",
          registerDate: "2010/05/15",
          landNumber: "大安區-12345-0001",
        },
      },
      {
        id: "2",
        filename: "台北市信義區xxx.pdf",
        uploadDate: "2023/12/18",
        status: `${TranscriptStatuses.Failed}`,
        attempts: 2,
        fileSize: "3.1 MB",
        uploader: "張小明",
        downloadJson: false,
        downloadExcel: false,
        points: 2,
        jsonContent: null,
      },
      {
        id: "3",
        filename: "新北市板橋區xxx.pdf",
        uploadDate: "2023/12/15",
        status: `${TranscriptStatuses.Success}`,
        attempts: 1,
        fileSize: "1.8 MB",
        uploader: "李小華",
        downloadJson: true,
        downloadExcel: true,
        points: 2,
        jsonContent: {
          address: "新北市板橋區XX路456號",
          owner: "李大華",
          area: "35.75平方公尺",
          registerDate: "2015/08/20",
          landNumber: "板橋區-45678-0002",
        },
      },
      {
        id: "4",
        filename: "台北市中山區xxx.pdf",
        uploadDate: "2023/12/10",
        status: `${TranscriptStatuses.Pending}`,
        attempts: 1,
        fileSize: "2.2 MB",
        uploader: "王小美",
        downloadJson: false,
        downloadExcel: false,
        points: 2,
        jsonContent: null,
      },
      {
        id: "5",
        filename: "新北市中和區xxx.pdf",
        uploadDate: "2023/12/05",
        status: `${TranscriptStatuses.Success}`,
        attempts: 3,
        fileSize: "4.0 MB",
        uploader: "張小明",
        downloadJson: true,
        downloadExcel: true,
        points: 2,
        jsonContent: {
          address: "新北市中和區XX路789號",
          owner: "張大明",
          area: "42.50平方公尺",
          registerDate: "2018/03/10",
          landNumber: "中和區-78901-0003",
        },
      },
      {
        id: "6",
        filename: "台北市松山區xxx.pdf",
        uploadDate: "2023/12/01",
        status: `${TranscriptStatuses.Failed}`,
        attempts: 3,
        fileSize: "2.7 MB",
        uploader: "李小華",
        downloadJson: false,
        downloadExcel: false,
        points: 2,
        jsonContent: null,
      },
      {
        id: "7",
        filename: "新北市新莊區xxx.pdf",
        uploadDate: "2023/11/28",
        status: `${TranscriptStatuses.Success}`,
        attempts: 1,
        fileSize: "1.5 MB",
        uploader: "王小美",
        downloadJson: true,
        downloadExcel: true,
        points: 2,
        jsonContent: {
          address: "新北市新莊區XX路101號",
          owner: "王大美",
          area: "38.25平方公尺",
          registerDate: "2019/11/05",
          landNumber: "新莊區-10112-0004",
        },
      },
      {
        id: "8",
        filename: "台北市內湖區xxx.pdf",
        uploadDate: "2023/11/25",
        status: `${TranscriptStatuses.Success}`,
        attempts: 2,
        fileSize: "3.3 MB",
        uploader: "張小明",
        downloadJson: true,
        downloadExcel: true,
        points: 2,
        jsonContent: {
          address: "台北市內湖區XX路202號",
          owner: "張小華",
          area: "55.75平方公尺",
          registerDate: "2020/07/15",
          landNumber: "內湖區-20223-0005",
        },
      },
      {
        id: "9",
        filename: "新北市三重區xxx.pdf",
        uploadDate: "2023/11/20",
        status: `${TranscriptStatuses.Pending}`,
        attempts: 0,
        fileSize: "2.9 MB",
        uploader: "李小華",
        downloadJson: false,
        downloadExcel: false,
        points: 2,
        jsonContent: null,
      },
      {
        id: "10",
        filename: "台北市文山區xxx.pdf",
        uploadDate: "2023/11/15",
        status: `${TranscriptStatuses.Pending}`,
        attempts: 0,
        fileSize: "2.1 MB",
        uploader: "王小美",
        downloadJson: false,
        downloadExcel: false,
        points: 2,
        jsonContent: null,
      },
    ]
    const total = 50
    return {
      records: transcripts,
      total,
    }
  }
}

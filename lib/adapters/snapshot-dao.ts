export enum SnapshotStatuses {
  Pending = "pending",
  Failed = "failed",
  Processing = "processing",
  Success = "success",
}

export type SnapshotStatus = `${SnapshotStatuses}`

export interface Snapshot {
  id: string
  filename: string
  uploadDate: string
  fileSize: string
  uploader: string
  content: unknown
}

export class SnapshotDao {
  constructor({ tenantId: _tenantId }: { tenantId: string }) {}

  async byId(_snapshotId: string) {
    return {
      id: "1",
      filename: "台北市大安區xxx.pdf",
      uploadDate: "2023/12/20",
      fileSize: "2.5 MB",
      uploader: "張小明",
      content: {
        address: "台北市大安區XX路123號",
        owner: "王小明",
        area: "50.25平方公尺",
        registerDate: "2010/05/15",
        landNumber: "大安區-12345-0001",
      },
    }
  }

  async byPage({
    keyword: _keyword,
    page: _page,
  }: {
    keyword: string
    page: number
  }) {
    const snapshots: Snapshot[] = [
      {
        id: "1",
        filename: "台北市大安區xxx.pdf",
        uploadDate: "2023/12/20",
        fileSize: "2.5 MB",
        uploader: "張小明",
        content: {
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
        fileSize: "3.1 MB",
        uploader: "張小明",
        content: null,
      },
      {
        id: "3",
        filename: "新北市板橋區xxx.pdf",
        uploadDate: "2023/12/15",
        fileSize: "1.8 MB",
        uploader: "李小華",
        content: {
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
        fileSize: "2.2 MB",
        uploader: "王小美",
        content: null,
      },
      {
        id: "5",
        filename: "新北市中和區xxx.pdf",
        uploadDate: "2023/12/05",
        fileSize: "4.0 MB",
        uploader: "張小明",
        content: {
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
        fileSize: "2.7 MB",
        uploader: "李小華",
        content: null,
      },
      {
        id: "7",
        filename: "新北市新莊區xxx.pdf",
        uploadDate: "2023/11/28",
        fileSize: "1.5 MB",
        uploader: "王小美",
        content: {
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
        fileSize: "3.3 MB",
        uploader: "張小明",
        content: {
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
        fileSize: "2.9 MB",
        uploader: "李小華",
        content: null,
      },
      {
        id: "10",
        filename: "台北市文山區xxx.pdf",
        uploadDate: "2023/11/15",
        fileSize: "2.1 MB",
        uploader: "王小美",
        content: null,
      },
    ]
    const total = 50
    return {
      records: snapshots,
      total,
    }
  }
}

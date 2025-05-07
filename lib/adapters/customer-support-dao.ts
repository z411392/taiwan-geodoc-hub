export interface ContactInfo {
  mobile: string
  email: string
  lineId: string
}

export class CustomerSupportDao {
  constructor({ tenantId: _tenantId }: { tenantId: string }) {}
  async contactInfo({}: { _placeholder?: unknown }) {
    return {
      mobile: "(02) 2345-6789",
      email: "service@landhelper.com",
      lineId: "@landhelper",
    } as ContactInfo
  }
}

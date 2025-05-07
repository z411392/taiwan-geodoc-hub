export interface Plan {
  id: string
  points: number
  price: number
  bonus: number
}

export class PlanDao {
  constructor({ tenantId: _tenantId }: { tenantId: string }) {}
  async all({}: { _placeholder?: unknown }) {
    return [
      { id: "1", points: 10000, price: 1000, bonus: 1000 },
      { id: "2", points: 5000, price: 500, bonus: 300 },
      { id: "3", points: 3000, price: 300, bonus: 100 },
      { id: "4", points: 1000, price: 100, bonus: 0 },
    ] as Plan[]
  }
}

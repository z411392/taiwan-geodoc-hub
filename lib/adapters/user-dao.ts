export interface User {
  id: string
  name: string
}

export class UserDao {
  async userFromSession(_: string): Promise<User | undefined> {
    return {
      id: "1234",
      name: "小菜",
    }
  }
}

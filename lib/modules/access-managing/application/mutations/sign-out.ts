import CallableInstance from "callable-instance"
import axios from "axios"

export interface SigningOut {
  csrfToken: string
}

export class SignOut extends CallableInstance<[SigningOut], Promise<void>> {
  constructor() {
    super("execute")
  }

  async execute({ csrfToken }: SigningOut) {
    return await axios.post(
      "/api/auth/sign-out",
      {},
      {
        headers: {
          "X-CSRF-Token": csrfToken,
        },
      },
    )
  }
}

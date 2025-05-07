import CallableInstance from "callable-instance"
import axios from "axios"

export interface SigningIn {
  idToken: string
  csrfToken: string
}

export class SignIn extends CallableInstance<[SigningIn], Promise<void>> {
  constructor() {
    super("execute")
  }

  async execute({ idToken, csrfToken }: SigningIn) {
    return await axios.post(
      "/api/auth/sign-in",
      { idToken },
      {
        headers: {
          "X-CSRF-Token": csrfToken,
        },
      },
    )
  }
}

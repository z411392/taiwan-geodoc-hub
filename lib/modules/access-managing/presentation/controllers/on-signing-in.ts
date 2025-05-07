import {
  type SigningIn,
  SignIn,
} from "@/lib/modules/access-managing/application/mutations/sign-in"

export const onSigningIn = async (query: SigningIn) => {
  const handler = new SignIn()
  await handler(query)
}

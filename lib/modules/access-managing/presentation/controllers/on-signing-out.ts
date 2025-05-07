import {
  type SigningOut,
  SignOut,
} from "@/lib/modules/access-managing/application/mutations/sign-out"

export const onSigningOut = async (query: SigningOut) => {
  const handler = new SignOut()
  await handler(query)
}

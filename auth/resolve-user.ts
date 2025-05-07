import { type Tokens } from "next-firebase-auth-edge"

export const resolveUser = (decodedToken: Tokens["decodedToken"]) => {
    const { uid, email, picture, phone_number, name, source_sign_in_provider } =
        decodedToken
    return {
        uid,
        email: email || "",
        displayName: name || "",
        photoURL: picture || "",
        phoneNumber: phone_number || "",
        providerId: source_sign_in_provider,
    }
}

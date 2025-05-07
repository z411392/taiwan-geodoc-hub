export default class InvalidSessionCookie extends Error {
  constructor({ sessionCookie }: { sessionCookie: string }) {
    super(
      JSON.stringify({
        sessionCookie,
        type: InvalidSessionCookie,
      }),
    )
  }
}

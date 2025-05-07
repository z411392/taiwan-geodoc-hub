export default class InvalidSession extends Error {
  constructor({ sessionCookie }: { sessionCookie: string }) {
    super(
      JSON.stringify({
        sessionCookie,
        type: InvalidSession,
      }),
    )
  }
}

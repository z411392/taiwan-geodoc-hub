export default class Unauthenticated extends Error {
    constructor() {
        super(JSON.stringify({}))
        this.name = "Unauthenticated"
    }
}

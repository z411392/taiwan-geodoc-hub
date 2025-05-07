import { type Registration } from "@/taiwan-geodoc-hub/modules/registration-managing/dtos/registration"

export abstract class RegistrationDao {
    abstract all(): Promise<Registration[]>
}

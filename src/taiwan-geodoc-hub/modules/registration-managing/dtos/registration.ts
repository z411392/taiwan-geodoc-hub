import { type ParcelType } from "@/taiwan-geodoc-hub/modules/registration-managing/enums/parcel-type"
import { type RegistrationStatus } from "@/taiwan-geodoc-hub/modules/registration-managing/enums/registration-status"

export type Registration = {
    id: string
    snapshotId: string
    city: string
    district: string
    section: string
    parcelType: `${ParcelType}`
    parcelNumber: string
    status: `${RegistrationStatus}`
    text: string
    json: unknown
}

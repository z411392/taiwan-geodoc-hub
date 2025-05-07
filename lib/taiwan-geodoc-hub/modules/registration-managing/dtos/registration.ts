import { type ParcelTypes } from "@/taiwan-geodoc-hub/modules/registration-managing/constants/parcel-types"
import { type RegistrationStatuses } from "@/taiwan-geodoc-hub/modules/registration-managing/constants/registration-statuses"

export type Registration = {
    id: string
    snapshotId: string
    city: string
    district: string
    section: string
    parcelType: `${ParcelTypes}`
    parcelNumber: string
    status: `${RegistrationStatuses}`
    text: string
    json: unknown
}

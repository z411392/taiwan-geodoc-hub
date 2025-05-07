import { type WaitForProcessCompletionPort } from "@/taiwan-geodoc-hub/modules/general/domain/ports/wait-for-process-completion-port"
import { injectable, inject } from "tsyringe"
import { UserId } from "@/taiwan-geodoc-hub/modules/general/constants/tokens"
import { Collection } from "@/taiwan-geodoc-hub/modules/general/enums/collection"
import {
    type CollectionReference,
    collection,
    doc,
    onSnapshot,
    getFirestore,
} from "firebase/firestore"
import { withResolvers } from "@/taiwan-geodoc-hub/utils/asyncio"
import { type ProcessState } from "@/taiwan-geodoc-hub/modules/general/dtos/process-state"
import { ProcessStatus } from "@/taiwan-geodoc-hub/modules/general/enums/process-status"

@injectable()
export class ProcessStateFirestoreAdapter
    implements WaitForProcessCompletionPort
{
    protected collection: CollectionReference
    constructor(@inject(UserId) protected user: string) {
        this.collection = collection(
            getFirestore(),
            String(Collection.Processes).replace(":userId", user),
        )
    }

    async waitFor(processStateId: string) {
        const document = doc(this.collection, processStateId)
        const { promise, resolve, reject } = withResolvers<void>()
        const unsubscribe = onSnapshot(document, (documentSnapshot) => {
            if (!documentSnapshot.exists()) resolve()
            const processState = {
                ...documentSnapshot.data(),
                id: processStateId,
            } as ProcessState
            if (processState.status === `${ProcessStatus.Completed}`)
                return resolve()
            if (processState.status === `${ProcessStatus.Failed}`)
                return reject(new Error(processState.reason))
        })
        try {
            await promise
        } catch (thrown) {
            throw thrown
        } finally {
            unsubscribe()
        }
    }
}

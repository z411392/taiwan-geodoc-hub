import {
  ListTranscripts,
  type ListingTranscripts,
} from "@/lib/modules/transcripts-parsing/application/queries/list-transcripts"
import { TranscriptDao } from "@/lib/adapters/transcript-dao"

export const onListingTranscripts = async (query: ListingTranscripts) => {
  const handler = new ListTranscripts({
    transcriptDao: new TranscriptDao({ tenantId: query.tenantId }),
  })
  return await handler(query)
}

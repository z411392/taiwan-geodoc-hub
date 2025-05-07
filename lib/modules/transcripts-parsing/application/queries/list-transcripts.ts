import CallableInstance from "callable-instance"
import {
  type TranscriptDao,
  type Transcript,
  TranscriptStatuses,
} from "@/lib/adapters/transcript-dao"

export interface ListingTranscripts {
  tenantId: string
  status?: TranscriptStatuses
  keyword: string
  page: number
}

export class ListTranscripts extends CallableInstance<
  [ListingTranscripts],
  Promise<{ records: Transcript[]; total: number }>
> {
  protected transcriptDao: TranscriptDao
  constructor({ transcriptDao }: { transcriptDao: TranscriptDao }) {
    super("execute")
    this.transcriptDao = transcriptDao
  }
  async execute({ status, keyword, page }: ListingTranscripts) {
    const transcripts = await this.transcriptDao.byPage({
      status,
      keyword,
      page,
    })
    return transcripts
  }
}

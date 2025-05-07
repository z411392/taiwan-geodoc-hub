import { Card, CardContent } from "~/components/shadcn/card"
import Header from "~/components/(with-resolve-tenant)/tutorials/header"
import SnapshotUploadingTutorial from "~/components/(with-resolve-tenant)/tutorials/snapshot-uploading-tutorial"
import ValueCrawlingTutorial from "~/components/(with-resolve-tenant)/tutorials/value-crawling-tutorial"
import ToppingUpTutorial from "~/components/(with-resolve-tenant)/tutorials/topping-up-tutorial"

export default function () {
    return (
        <Card>
            <Header />
            <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                    <SnapshotUploadingTutorial />
                    <ValueCrawlingTutorial />
                    <ToppingUpTutorial />
                </div>
            </CardContent>
        </Card>
    )
}

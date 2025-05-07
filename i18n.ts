import { getRequestConfig, type RequestConfig } from "next-intl/server"
import { headers as getHeaders, cookies as getCookies } from "next/headers"
import Negotiator from "negotiator"
import { match } from "@formatjs/intl-localematcher"
import { Locale } from "@/taiwan-geodoc-hub/modules/general/constants/cookies"
import { Route } from "@/taiwan-geodoc-hub/modules/general/enums/route"

const Locales = ["en", "zh"]
const DefaultLocale = "zh"

const detectLocale = (acceptLanguage: string) => {
    const negotiator = new Negotiator({
        headers: {
            "accept-language": acceptLanguage,
        },
    })
    const languages = negotiator.languages()
    return match(languages, Locales, DefaultLocale)
}

export default getRequestConfig(async ({ locale }) => {
    if (!locale) {
        const cookies = await getCookies()
        locale = cookies.get(Locale.name)?.value
        if (!(locale && Locales.includes(locale))) {
            const headers = await getHeaders()
            const acceptLanguage = headers.get("accept-language")!
            locale = detectLocale(acceptLanguage)
        }
    }
    const _ = await new Promise<Record<string, any>>((resolve) => {
        Promise.all([
            import(`~/public/locales/general/constants/${locale}.json`),
            import(`~/public/locales/general/exception/${locale}.json`),
            import(`~/public/locales/general/region/${locale}.json`),
            import(`~/public/locales/general/role-type/${locale}.json`),
            import(`~/public/locales/general/tenant-status/${locale}.json`),
            import(`~/public/locales/general/topic/${locale}.json`),
            import(`~/public/locales/general/value-status/${locale}.json`),
            import(`~/public/locales/general/moment/${locale}.json`),
            import(`~/public/locales/general/nav-item/${locale}.json`),
        ]).then(
            ([
                { default: Constants },
                { default: Exception },
                { default: Region },
                { default: RoleType },
                { default: TenantStatus },
                { default: Topic },
                { default: ValueStatus },
                { default: Moment },
                { default: NavItem },
            ]) => {
                resolve({
                    constants: Constants,
                    exception: Exception,
                    region: Region,
                    "role-type": RoleType,
                    "tenant-status": TenantStatus,
                    topic: Topic,
                    "value-status": ValueStatus,
                    moment: Moment,
                    "nav-item": NavItem,
                })
            },
        )
    })

    const withoutResolveTenant = await new Promise<Record<string, any>>(
        (resolve) => {
            Promise.all([
                import(
                    `~/public/locales/components/(without-resolve-tenant)/header/${locale}.json`
                ),
                import(
                    `~/public/locales/components/(without-resolve-tenant)/header/back-button/${locale}.json`
                ),
                import(
                    `~/public/locales/components/(without-resolve-user)/language-selector/${locale}.json`
                ),
            ]).then(
                ([
                    { default: Header },
                    { default: BackButton },
                    { default: LanguageSelector },
                ]) => {
                    resolve({
                        "(without-resolve-tenant)/header": Header,
                        "(without-resolve-tenant)/header/back-button":
                            BackButton,
                        "(without-resolve-user)/language-selector":
                            LanguageSelector,
                    })
                },
            )
        },
    )

    const withoutResolveUser = await new Promise<Record<string, any>>(
        (resolve) => {
            Promise.all([
                import(
                    `~/public/locales/components/(without-resolve-user)/cookie-consent-notice/accept-button/${locale}.json`
                ),
                import(
                    `~/public/locales/components/(without-resolve-user)/cookie-consent-notice/decline-button/${locale}.json`
                ),
                import(
                    `~/public/locales/components/(without-resolve-user)/cookie-consent-notice/view-details-button/${locale}.json`
                ),
                import(
                    `~/public/locales/components/(without-resolve-user)/cookie-consent-notice/close-button/${locale}.json`
                ),
                import(
                    `~/public/locales/components/(without-resolve-user)/cookie-consent-notice/description/${locale}.json`
                ),
                import(
                    `~/public/locales/components/(without-resolve-user)/sign-in-with-google-button/${locale}.json`
                ),
            ]).then(
                ([
                    { default: AcceptButton },
                    { default: DeclineButton },
                    { default: ViewDetailsButton },
                    { default: CloseButton },
                    { default: Description },
                    { default: SignInWithGoogleButton },
                ]) => {
                    resolve({
                        "(without-resolve-user)/cookie-consent-notice/accept-button":
                            AcceptButton,
                        "(without-resolve-user)/cookie-consent-notice/decline-button":
                            DeclineButton,
                        "(without-resolve-user)/cookie-consent-notice/view-details-button":
                            ViewDetailsButton,
                        "(without-resolve-user)/cookie-consent-notice/close-button":
                            CloseButton,
                        "(without-resolve-user)/cookie-consent-notice/description":
                            Description,
                        "(without-resolve-user)/sign-in-with-google-button":
                            SignInWithGoogleButton,
                    })
                },
            )
        },
    )

    const withResolveUser = await new Promise<Record<string, any>>(
        (resolve) => {
            Promise.all([
                import(
                    `~/public/locales/components/(with-resolve-user)/pending-tenants/header/${locale}.json`
                ),
                import(
                    `~/public/locales/components/(with-resolve-user)/create-tenant/dialog-trigger/${locale}.json`
                ),
                import(
                    `~/public/locales/components/(with-resolve-user)/create-tenant/dialog-header/${locale}.json`
                ),
                import(
                    `~/public/locales/components/(with-resolve-user)/create-tenant/name/${locale}.json`
                ),
                import(
                    `~/public/locales/components/(with-resolve-user)/create-tenant/dialog-footer/${locale}.json`
                ),
                import(
                    `~/public/locales/components/(with-resolve-user)/create-tenant/${locale}.json`
                ),
            ]).then(
                ([
                    { default: PendingTenantsHeader },
                    { default: CreateNewTenantButtonDialogTrigger },
                    { default: CreateNewTenantButtonDialogHeader },
                    { default: CreateNewTenantButtonName },
                    { default: CreateNewTenantButtonDialogFooter },
                    { default: CreateNewTenantButton },
                ]) => {
                    resolve({
                        "(with-resolve-user)/pending-tenants/header":
                            PendingTenantsHeader,
                        "(with-resolve-user)/create-tenant/dialog-trigger":
                            CreateNewTenantButtonDialogTrigger,
                        "(with-resolve-user)/create-tenant/dialog-header":
                            CreateNewTenantButtonDialogHeader,
                        "(with-resolve-user)/create-tenant/name":
                            CreateNewTenantButtonName,
                        "(with-resolve-user)/create-tenant/dialog-footer":
                            CreateNewTenantButtonDialogFooter,
                        "(with-resolve-user)/create-tenant":
                            CreateNewTenantButton,
                    })
                },
            )
        },
    )

    const dashboard = await new Promise<Record<string, any>>((resolve) => {
        Promise.all([
            import(
                `~/public/locales/components/(with-resolve-tenant)/paginator/${locale}.json`
            ),
            import(
                `~/public/locales/components/(with-resolve-tenant)/header/dropdown-menu/sign-out-button/${locale}.json`
            ),
            import(
                `~/public/locales/components/(with-resolve-tenant)/header/inbox/${locale}.json`
            ),
            import(
                `~/public/locales/components/(with-resolve-tenant)/header/inbox/view-all-button/${locale}.json`
            ),
            import(
                `~/public/locales/components/(with-resolve-tenant)/upload-snapshot/dialog-trigger/${locale}.json`
            ),
            import(
                `~/public/locales/components/(with-resolve-tenant)/upload-snapshot/dialog-header/${locale}.json`
            ),
            import(
                `~/public/locales/components/(with-resolve-tenant)/upload-snapshot/drag-drop/${locale}.json`
            ),
            import(
                `~/public/locales/components/(with-resolve-tenant)/upload-snapshot/select-file-button/${locale}.json`
            ),
            import(
                `~/public/locales/components/(with-resolve-tenant)/upload-snapshot/dialog-footer/${locale}.json`
            ),
            import(
                `~/public/locales/components/(with-resolve-tenant)/tutorials/header/${locale}.json`
            ),
            import(
                `~/public/locales/components/(with-resolve-tenant)/tutorials/snapshot-uploading-tutorial/${locale}.json`
            ),
            import(
                `~/public/locales/components/(with-resolve-tenant)/tutorials/value-crawling-tutorial/${locale}.json`
            ),
            import(
                `~/public/locales/components/(with-resolve-tenant)/tutorials/topping-up-tutorial/${locale}.json`
            ),
            import(
                `~/public/locales/components/(with-resolve-tenant)/dashboard-insights/balance/${locale}.json`
            ),
            import(
                `~/public/locales/components/(with-resolve-tenant)/dashboard-insights/unlocking/${locale}.json`
            ),
            import(
                `~/public/locales/components/(with-resolve-tenant)/dashboard-insights/team/${locale}.json`
            ),
            import(
                `~/public/locales/components/(with-resolve-tenant)/dashboard-insights/crawling/${locale}.json`
            ),
            import(
                `~/public/locales/components/(with-resolve-tenant)/crawl-values/dialog-trigger/${locale}.json`
            ),
            import(
                `~/public/locales/components/(with-resolve-tenant)/crawl-values/dialog-header/${locale}.json`
            ),
            import(
                `~/public/locales/components/(with-resolve-tenant)/crawl-values/drag-drop/${locale}.json`
            ),
            import(
                `~/public/locales/components/(with-resolve-tenant)/crawl-values/select-file-button/${locale}.json`
            ),
            import(
                `~/public/locales/components/(with-resolve-tenant)/crawl-values/dialog-footer/${locale}.json`
            ),
            import(
                `~/public/locales/components/(with-resolve-tenant)/top-up/contact-info/email/${locale}.json`
            ),
            import(
                `~/public/locales/components/(with-resolve-tenant)/top-up/contact-info/mobile/${locale}.json`
            ),
            import(
                `~/public/locales/components/(with-resolve-tenant)/top-up/contact-info/line-id/${locale}.json`
            ),
            import(
                `~/public/locales/components/(with-resolve-tenant)/top-up/dialog-trigger/${locale}.json`
            ),
            import(
                `~/public/locales/components/(with-resolve-tenant)/top-up/dialog-header/${locale}.json`
            ),
            import(
                `~/public/locales/components/(with-resolve-tenant)/top-up/balance/${locale}.json`
            ),
            import(
                `~/public/locales/components/(with-resolve-tenant)/top-up/rules/point-consumption/${locale}.json`
            ),
            import(
                `~/public/locales/components/(with-resolve-tenant)/top-up/rules/point-notice/${locale}.json`
            ),
            import(
                `~/public/locales/components/(with-resolve-tenant)/top-up/dialog-footer/${locale}.json`
            ),
            import(
                `~/public/locales/components/(with-resolve-tenant)/top-up/contact-info/header/${locale}.json`
            ),
            import(
                `~/public/locales/components/(with-resolve-tenant)/top-up/plans/plan/${locale}.json`
            ),
        ]).then(
            ([
                { default: Paginator },
                { default: SignOutButton },
                { default: Inbox },
                { default: ViewAllButton },
                { default: UploadSnapshotDialogTrigger },
                { default: UploadSnapshotDialogHeader },
                { default: UploadSnapshotDragDrop },
                { default: UploadSnapshotSelectFileButton },
                { default: UploadSnapshotDialogFooter },
                { default: TutorialsHeader },
                { default: SnapshotUploadingTutorial },
                { default: ValueCrawlingTutorial },
                { default: ToppingUpTutorial },
                { default: DashboardInsightsBalance },
                { default: DashboardInsightsUnlocking },
                { default: DashboardInsightsTeam },
                { default: DashboardInsightsCrawling },
                { default: CrawlValuesDialogTrigger },
                { default: CrawlValuesDialogHeader },
                { default: CrawlValuesDragDrop },
                { default: CrawlValuesSelectFileButton },
                { default: CrawlValuesDialogFooter },
                { default: TopUpContactInfoEmail },
                { default: TopUpContactInfoMobile },
                { default: TopUpContactInfoLineId },
                { default: TopUpDialogTrigger },
                { default: TopUpDialogHeader },
                { default: TopUpBalance },
                { default: PointConsumption },
                { default: PointNotice },
                { default: TopUpDialogFooter },
                { default: TopUpContactInfoHeader },
                { default: TopUpPlansPlan },
            ]) => {
                resolve({
                    "(with-resolve-tenant)/paginator": Paginator,
                    "(with-resolve-tenant)/header/dropdown-menu/sign-out-button":
                        SignOutButton,
                    "(with-resolve-tenant)/header/inbox": Inbox,
                    "(with-resolve-tenant)/header/inbox/view-all-button":
                        ViewAllButton,
                    "(with-resolve-tenant)/upload-snapshot/dialog-trigger":
                        UploadSnapshotDialogTrigger,
                    "(with-resolve-tenant)/upload-snapshot/dialog-header":
                        UploadSnapshotDialogHeader,
                    "(with-resolve-tenant)/upload-snapshot/drag-drop":
                        UploadSnapshotDragDrop,
                    "(with-resolve-tenant)/upload-snapshot/select-file-button":
                        UploadSnapshotSelectFileButton,
                    "(with-resolve-tenant)/upload-snapshot/dialog-footer":
                        UploadSnapshotDialogFooter,
                    "(with-resolve-tenant)/tutorials/header": TutorialsHeader,
                    "(with-resolve-tenant)/tutorials/snapshot-uploading-tutorial":
                        SnapshotUploadingTutorial,
                    "(with-resolve-tenant)/tutorials/value-crawling-tutorial":
                        ValueCrawlingTutorial,
                    "(with-resolve-tenant)/tutorials/topping-up-tutorial":
                        ToppingUpTutorial,
                    "(with-resolve-tenant)/dashboard-insights/balance":
                        DashboardInsightsBalance,
                    "(with-resolve-tenant)/dashboard-insights/unlocking":
                        DashboardInsightsUnlocking,
                    "(with-resolve-tenant)/dashboard-insights/team":
                        DashboardInsightsTeam,
                    "(with-resolve-tenant)/dashboard-insights/crawling":
                        DashboardInsightsCrawling,
                    "(with-resolve-tenant)/crawl-values/dialog-trigger":
                        CrawlValuesDialogTrigger,
                    "(with-resolve-tenant)/crawl-values/dialog-header":
                        CrawlValuesDialogHeader,
                    "(with-resolve-tenant)/crawl-values/drag-drop":
                        CrawlValuesDragDrop,
                    "(with-resolve-tenant)/crawl-values/select-file-button":
                        CrawlValuesSelectFileButton,
                    "(with-resolve-tenant)/crawl-values/dialog-footer":
                        CrawlValuesDialogFooter,
                    "(with-resolve-tenant)/top-up/contact-info/email":
                        TopUpContactInfoEmail,
                    "(with-resolve-tenant)/top-up/contact-info/mobile":
                        TopUpContactInfoMobile,
                    "(with-resolve-tenant)/top-up/contact-info/line-id":
                        TopUpContactInfoLineId,
                    "(with-resolve-tenant)/top-up/dialog-trigger":
                        TopUpDialogTrigger,
                    "(with-resolve-tenant)/top-up/dialog-header":
                        TopUpDialogHeader,
                    "(with-resolve-tenant)/top-up/balance": TopUpBalance,
                    "(with-resolve-tenant)/top-up/rules/point-consumption":
                        PointConsumption,
                    "(with-resolve-tenant)/top-up/rules/point-notice":
                        PointNotice,
                    "(with-resolve-tenant)/top-up/dialog-footer":
                        TopUpDialogFooter,
                    "(with-resolve-tenant)/top-up/contact-info/header":
                        TopUpContactInfoHeader,
                    "(with-resolve-tenant)/top-up/plans/plan": TopUpPlansPlan,
                })
            },
        )
    })
    const members = await new Promise<Record<string, any>>((resolve) => {
        Promise.all([
            import(
                `~/public/locales/components/(with-resolve-tenant)/member-table/search-form/role/${locale}.json`
            ),
            import(
                `~/public/locales/components/(with-resolve-tenant)/member-table/search-form/q/${locale}.json`
            ),
            import(
                `~/public/locales/components/(with-resolve-tenant)/member-table/table-header/${locale}.json`
            ),
        ]).then(
            ([
                { default: SearchFormRole },
                { default: SearchFormQ },
                { default: TableHeader },
            ]) => {
                resolve({
                    "(with-resolve-tenant)/member-table/search-form/role":
                        SearchFormRole,
                    "(with-resolve-tenant)/member-table/search-form/q":
                        SearchFormQ,
                    "(with-resolve-tenant)/member-table/table-header":
                        TableHeader,
                })
            },
        )
    })

    const pages = await new Promise<Record<string, any>>((resolve) => {
        Promise.all([
            import(`~/public/locales/pages/${locale}.json`),
            import(`~/public/locales/pages/auth/sign-in/${locale}.json`),
            import(`~/public/locales/pages/terms-of-use/${locale}.json`),
            import(`~/public/locales/pages/privacy-policy/${locale}.json`),
            import(`~/public/locales/pages/tenants/${locale}.json`),
            import(
                `~/public/locales/pages/tenants/[tenantId]/dashboard/${locale}.json`
            ),
            import(
                `~/public/locales/pages/tenants/[tenantId]/members/${locale}.json`
            ),
            // import(
            //     `~/public/locales/pages/tenants/[tenantId]/notifications/${locale}.json`
            // ),
            // import(
            //     `~/public/locales/pages/tenants/[tenantId]/snapshots/${locale}.json`
            // ),
            // import(
            //     `~/public/locales/pages/tenants/[tenantId]/snapshots/[snapshotId]/registrations/${locale}.json`
            // ),
            // import(
            //     `~/public/locales/pages/tenants/[tenantId]/transactions/${locale}.json`
            // ),
            // import(
            //     `~/public/locales/pages/tenants/[tenantId]/values/${locale}.json`
            // ),
        ]).then(
            ([
                { default: Root },
                { default: SignIn },
                { default: TermsOfUse },
                { default: PrivacyPolicy },
                { default: TenantSelection },
                { default: Dashboard },
                { default: Members },
                // { default: Notifications },
                // { default: Snapshots },
                // { default: Registrations },
                // { default: Transactions },
                // { default: Values },
            ]) => {
                resolve({
                    [Route.Root]: Root,
                    [Route.SignIn]: SignIn,
                    [Route.TermsOfUse]: TermsOfUse,
                    [Route.PrivacyPolicy]: PrivacyPolicy,
                    [Route.TenantSelection]: TenantSelection,
                    [Route.Dashboard]: Dashboard,
                    [Route.Members]: Members,
                    // [Route.Notifications]: Notifications,
                    // [Route.Snapshots]: Snapshots,
                    // [Route.Registrations]: Registrations,
                    // [Route.Transactions]: Transactions,
                    // [Route.Values]: Values,
                })
            },
        )
    })

    const withResolveTenant = {
        ...dashboard,
        ...members,
    }

    const messages = {
        _,
        ...withoutResolveTenant,
        ...withoutResolveUser,
        ...withResolveUser,
        ...withResolveTenant,
        ...pages,
    }

    return {
        locale,
        messages,
    } as RequestConfig
})

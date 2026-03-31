"use client"

import { OrganizationList } from "@clerk/nextjs"
import type { Organization } from "@clerk/nextjs/server"

function OrgSelectionPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <OrganizationList
                hidePersonal
                afterCreateOrganizationUrl={(org: Organization) => `/${org.id}/dashboard`}
                afterSelectOrganizationUrl={(org: Organization) => `/${org.id}/dashboard`}
                appearance={{
                    elements: {
                        rootBox: "mx-auto",
                        card: "shadow-lg"
                    }
                }}
            />
        </div>
    )
}

export default OrgSelectionPage
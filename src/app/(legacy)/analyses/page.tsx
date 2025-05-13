

import { getAnalysesByTranscriptId } from "@/actions/(legacy)/analyses/action";
import { AnalysisComponent } from "@/components/analyses/analysis-component";

/**
 * Next.js pages are Server Components by default. You should fetch data at the top level in a server component whenever possible.
 *
 * @see {@link https://nextjs.org/docs/app/building-your-application/rendering/server-components}
 */
export default async function Page() {
    // Fetch data in the Server Component
    const analyses = await getAnalysesByTranscriptId(239867);
    console.log(analyses);
    if (!analyses) {
        return <div>No analysis found</div>;
    }

    return (
        <div>
            <AnalysisComponent analysis={analyses} />
        </div>
    );
}

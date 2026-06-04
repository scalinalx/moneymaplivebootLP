import { CvdpLanding } from '@/components/create-viral-digital-product/CvdpLanding';
import {
    CVDP_PRICE,
    CVDP_BUMP1_PRICE,
    CVDP_BUMP2_PRICE,
    CVDP_BUMP3_PRICE,
    CVDP_BUNDLE_PRICE,
} from '@/lib/constants';

// Server component: reads prices from SERVER-ONLY env vars (no NEXT_PUBLIC) and passes the
// resolved values into the client landing component as props. The actual charge is computed
// server-side in /api/create-viral-digital-product/create-payment-intent.
export default function CreateViralDigitalProductPage() {
    return (
        <CvdpLanding
            prices={{
                core: CVDP_PRICE,
                bump1: CVDP_BUMP1_PRICE,
                bump2: CVDP_BUMP2_PRICE,
                bump3: CVDP_BUMP3_PRICE,
                bundle: CVDP_BUNDLE_PRICE,
            }}
        />
    );
}

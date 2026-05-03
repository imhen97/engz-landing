// Twitter card image — uses the same renderer as Open Graph (/opengraph-image).
// Re-exports the default by direct import so Next.js bundles a separate route
// but the visual output is identical.
import OGImage from "./opengraph-image";

export const runtime = "nodejs";
export const alt = "ENGZ — 김해나 1:1 프리미엄 영어";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default OGImage;

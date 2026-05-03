// Twitter card image — same render as Open Graph (/opengraph-image).
// Next.js route-segment configs must be statically parseable, so we
// redeclare the constants and re-export the default render function.
import OGImage from "./opengraph-image";

export const runtime = "edge";
export const alt = "ENGZ — 김해나 1:1 프리미엄 영어";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default OGImage;

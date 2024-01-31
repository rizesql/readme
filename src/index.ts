import { getContent } from "./handlers";
import { parseSection, parseTheme } from "./types";

const worker: ExportedHandler = {
	async fetch(request, env, ctx) {
		const req = new URL(request.url);

		const section = parseSection(req.searchParams.get("section"));
		const theme = parseTheme(req.searchParams.get("theme"));
		const content = getContent({ theme, section }, request);

		return new Response(content, {
			headers: {
				"content-type": "image/svg+xml",
				"cache-control": "no-store, no-cache, must-revalidate, proxy-revalidate",
				pragma: "no-cache",
				expires: "0",
			},
		});
	},
};

export default worker;

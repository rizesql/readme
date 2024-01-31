import { Props, SectionOrDefault } from "~/types";
import { header } from "./header";
import { linkGithub, linkTwitter } from "./link.github";
import { main } from "./main";
import { svg } from "./utils";

type Handlers = Record<SectionOrDefault, (props: Props, req: Request) => string>;

export const handlers = {
	header,
	main,
	"link.github": linkGithub,
	"link.twitter": linkTwitter,
	fallback: (props, req) =>
		svg({
			styles: "",
			markup: "<div>empty</div>",
			attrs: { height: "100", width: "420", "data-theme": props.theme },
		}),
} satisfies Handlers;

export const getContent = (props: Props, req: Request) =>
	handlers[props.section](props, req);

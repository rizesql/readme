import { Theme } from "~/types";

export const html = String.raw;

export const BREAKPOINTS = {
	MD: 69,
	LG: 69,
} as const;

export type Layout = {
	width?: number | undefined;
	height: number;
};

interface Attributes {
	height: string;
	"data-theme": Theme;
	[key: string]: string;
}

function attr(obj: Record<string, string>) {
	return Object.entries(obj).reduce((acc, [key, val]) => `${acc} ${key}="${val}"`, "");
}

export function svg(props: { styles: string; markup: string; attrs: Attributes }) {
	if (!props.attrs.width) props.attrs.width = "100%";

	console.log(attr(props.attrs));

	return html`
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" ${attr(props.attrs)}>
			<foreignObject width="100%" height="100%">
				<div xmlns="http://www.w3.org/1999/xhtml">
					<style>
						${props.styles}
					</style>
					${props.markup}
				</div>
			</foreignObject>
		</svg>
	`;
}

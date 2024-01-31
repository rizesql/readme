import { Props } from "~/types";
import { css } from "./styles";
import { BREAKPOINTS, Layout, html, svg } from "./utils";

import { contributions } from "../stats.json";

const layout = {
	height: 20,
} satisfies Layout;

export function header(props: Props, _req: Request) {
	const styles = css`
		:root {
			--size-height: ${layout.height};
		}

		.header {
			align-items: center;
			font-family: var(--font-sans);
			color: var(--color-text);
		}

		.readme {
			contain: content;
			text-align: right;
			grid-area: 1 / 5 / span 1 / span 2;
		}

		@media (width > ${BREAKPOINTS.MD}px) {
			.menu {
				grid-area: 1 / 1 / span 1 / span 2;
			}
			.contributions {
				contain: content;
				grid-area: 1 / 3 / span 1 / span 2;
			}
			.readme {
				grid-area: 1 / 5 / span 1 / span 2;
			}
		}

		@media (width > ${BREAKPOINTS.LG}px) {
			.menu {
				grid-area: 1 / 1 / span 1 / span 3;
			}
			.contributions {
				grid-area: 1 / 4 / span 1 / span 2;
			}
			.readme {
				grid-area: 1 / 6 / span 1 / span 1;
			}
		}
	`;

	const markup = html`
		<div class="header grid label">
			<div class="menu fade-in">Menu</div>
			<div class="contributions fade-in">
				<span class="shine">${(contributions / 1000).toFixed(1)}k</span>
				Contributions
			</div>
			<div class="readme fade-in">readme.md</div>
		</div>
	`;

	return svg({
		markup,
		styles,
		attrs: { height: `${layout.height}`, "data-theme": props.theme },
	});
}

import { Props } from "~/types";
import { css } from "./styles";
import { Layout, html, svg } from "./utils";

const layout = {
	height: 18,
	width: 100,
} satisfies Layout;

function link(label: string, idx: string, props: Props) {
	const styles = css`
		:root {
			--size-height: ${layout.height};
			--size-width: ${layout.width};
			--i: ${idx};
		}

		.wrapper {
			--delay: calc(var(--animate-in-links-delay) + var(--i) * 1.2s);
			font-family: var(--font-sans);
			color: var(--color-text);
		}
		@-moz-document url-prefix() {
			/* Overwrite default, allow this to show in FF */
			.wrapper {
				display: block;
			}
		}

		.link {
			display: flex;
			justify-content: start;
			align-items: center;
			gap: 3px;
		}
		.link__label {
			animation-delay: ${Math.random() * 10}s;
		}
		.link__arrow {
			font-size: 0.75em;
			position: relative;
			inset-block-start: 0.1em;
			animation-name: rotate;
			animation-duration: 5s;
			animation-timing-function: ease-in-out;
			animation-iteration-count: infinite;
			animation-delay: ${Math.random() * 5}s;
		}

		@keyframes rotate {
			0% {
				transform: rotate(0deg);
			}
			10%,
			100% {
				transform: rotate(360deg);
			}
		}
	`;

	const markup = html` <main class="wrapper">
		<div class="link fade-in">
			<div class="link__label shine">${label}</div>
			<div class="link__arrow">↗</div>
		</div>
	</main>`;

	return svg({
		styles,
		markup,
		attrs: {
			height: `${layout.height}`,
			width: `${layout.width}`,
			"data-theme": props.theme,
		},
	});
}

export function linkGithub(props: Props, req: Request) {
	const idx = new URL(req.url).searchParams.get("i") ?? "0";

	return link("Github", idx, props);
}

export function linkTwitter(props: Props, req: Request) {
	const idx = new URL(req.url).searchParams.get("i") ?? "0";

	return link("Twitter", idx, props);
}

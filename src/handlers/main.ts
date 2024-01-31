import { Props, Year } from "~/types";
import data from "../stats.json";
import { css } from "./styles";
import { BREAKPOINTS, html, svg } from "./utils";

const MAX_YEARS = 3;

const BODY_COPY =
	"I'm Ștefan, also known as @rizesql. A Bucharest-based technologist and internet enjoyer.";

const layout = {
	height: 300,
	dots: {
		rows: 6,
		size: 24,
		gap: 5,
	},
	year: {
		gap: 5,
	},
} as const;

const format = (date: Date) =>
	date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});

const date = (years: Year[], i: number) =>
	i == 0 ? format(new Date()) : new Date(years[i].from).getFullYear();

const days = (days: Year["days"]) =>
	days.map((level) => `<div class="dot dot--${level}"></div>`).join("");

export function main(props: Props, req: Request) {
	const styles = css`
		:root {
			--rows: ${layout.dots.rows};
			--size-width: 100cqw;
			--size-height: ${layout.height};
			--size-dot-gap: ${layout.dots.gap};
			--size-dot: ${layout.dots.size};
			--size-year-gap: ${layout.year.gap};
			--size-label-height: 20;
			--duration: 360;
		}

		.wrapper {
			align-items: flex-end;
			grid-template-rows: 1fr auto;
			row-gap: 20px;
			font-family: var(--font-sans);
			color: var(--color-text);
		}

		.intro {
			contain: content;
			grid-area: 1 / 1 / span 1 / span 6;
			font-size: 18px;
			font-weight: 500;
		}
		.intro span {
			contain: content;
			--duration: 980ms;
			--delay: calc(var(--animate-in-copy-delay) + var(--i) * 10ms);
		}

		@media (width > ${BREAKPOINTS.MD}px) {
			.intro {
				grid-area: 1 / 3 / span 1 / span 4;
				font-size: 22px;
			}
		}
		@media (width > ${BREAKPOINTS.LG}px) {
			.intro {
				grid-area: 1 / 4 / span 1 / span 3;
			}
		}

		.graph {
			--delay: var(--animate-in-graph-delay);
			grid-area: 2 / 1 / span 1 / span 6;
		}

		.years {
			--_w: var(--w);
			--_h: calc(var(--h) + var(--size-label-height));

			display: flex;
			gap: calc(var(--size-year-gap) * 1px);

			contain: strict;
			inline-size: calc(var(--_w) * 1px);
			block-size: calc(var(--_h) * 1px);
			will-change: transform;
			backface-visibility: hidden;
			transform: translateZ(0);

			animation-name: scroll, fade-in;
			animation-timing-function: linear, ease-out;
			animation-duration: calc(30s + (var(--_w) * 0.06s)), 2.5s;
			animation-fill-mode: both, both;
			animation-delay: 2s, var(--animate-in-graph-delay);
		}
		@keyframes scroll {
			0% {
				transform: translateX(60px);
			}
			100% {
				transform: translateX(calc(-100% + 100cqw));
			}
		}

		.year {
			contain: strict;
			content-visibility: auto;
			inline-size: calc(var(--w) * 1px);
			block-size: calc(var(--_h) * 1px);
		}

		.year__label {
			contain: strict;
			block-size: calc(var(--size-label-height) * 1px);
			content-visibility: auto;
			display: flex;
			align-items: end;
		}
		.year__days {
			contain: content;
			display: grid;
			grid-auto-flow: column;
			grid-template-rows: repeat(var(--rows), calc(var(--size-dot) * 1px));
			grid-auto-columns: calc(var(--size-dot) * 1px);
			gap: calc(var(--size-dot-gap) * 1px);

			contain: strict;
			content-visibility: auto;
			inline-size: calc(var(--w) * 1px);
			block-size: calc(var(--h) * 1px);
		}
		.year__days .dot {
			contain: strict;
			content-visibility: auto;
			aspect-ratio: 1;
			inline-size: calc(var(--size-dot) * 1px);
			block-size: calc(var(--size-dot) * 1px);
			border: calc(var(--size-dot) * 0.075 * 1px) solid var(--color-dot-border);
			border-radius: calc(var(--size-dot) * 0.15 * 1px);
			will-change: transform;
		}
		.dot--0 {
			background-color: var(--color-dot-bg-0);
		}
		.dot--1 {
			background-color: var(--color-dot-bg-1);
		}
		.dot--2 {
			background-color: var(--color-dot-bg-2);
		}
		.dot--3 {
			background-color: var(--color-dot-bg-3);
		}
		.dot--4 {
			background-color: var(--color-dot-bg-4);
		}
	`;

	const years = data.years.slice(0, MAX_YEARS);
	const location = {
		city: (req.cf?.city || "") as string,
		country: (req.cf?.country || "") as string,
	};

	// Used to give the containing div `contain: strict` for perforamnce reasons.
	const sizes = years.map((year) => {
		const columns = Math.ceil(year.days.length / layout.dots.rows);
		const width = columns * layout.dots.size + (columns - 1) * layout.dots.gap;
		const height =
			layout.dots.rows * layout.dots.size + (layout.dots.rows - 1) * layout.dots.gap;
		return [width, height];
	});

	// Calculate total length based on the width of the columns and the year gap
	const length =
		sizes.reduce((acc, size) => {
			acc += size[0] + layout.year.gap;
			return acc;
		}, 0) - layout.year.gap;

	const markup = html` <main class="wrapper grid">
		<article class="intro">
			<p>
				${BODY_COPY.split("")
					.map((c, i) => html`<span class="fade-in" style="--i: ${i};">${c}</span>`)
					.join("")}
			</p>
		</article>

		<article class="graph">
			<div class="years" style="--w: ${length}; --h: ${sizes[0][1]};">
				${years
					.map(
						(year, i) => /* html */ `
						<div class="year year--${i}" style="--w: ${sizes[i][0]}; --h: ${sizes[i][1]};">
							<div class="year__days">${days(year.days)}</div>
							<div class="year__label label"><span>${date(years, i)}</span></div>
						</div>
					`,
					)
					.join("")}
			</div>
		</article>
	</main>`;

	return svg({
		styles,
		markup,
		attrs: {
			height: `${layout.height}`,
			"data-theme": props.theme,
		},
	});
}

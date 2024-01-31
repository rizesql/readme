export const baseStyles = /*css*/ `
	@font-face {
		font-family: 'Overused Grotesk';
		src:
			url('/fonts/OverusedGrotesk-VF.woff2') format('woff2 supports variations'),
			url('/fonts/OverusedGrotesk-VF.woff2') format('woff2-variations');
		font-weight: 300 900;
	}

	:root {
		--font-sans: 'Overused Grotesk', -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif;

		--color-text-light: #255df6;
		--color-dot-bg-0-light: #ebedf0;
		--color-dot-bg-1-light: #a7befb;
		--color-dot-bg-2-light: #628bf9;
		--color-dot-bg-3-light: #4071f7;
		--color-dot-bg-4-light: #255df6;
		--color-dot-border-light: rgb(0 0 0 / 0.06);

		--color-text-dark: #255df6;
		--color-dot-bg-0-dark: #171b21;
		--color-dot-bg-1-dark: #152a62;
		--color-dot-bg-2-dark: #2048b3;
		--color-dot-bg-3-dark: #1951eb;
		--color-dot-bg-4-dark: #0048ff;
		--color-dot-border-dark: rgb(0 0 0 / 0.06);

		/* Initial animation offset... */
		--default-delay: 1s;
		--default-duration: 1.55s;
		--default-stagger: 0.1s;

		/* Animation orchestration */
		--animate-in-menu-delay: calc(var(--default-delay) + var(--default-stagger) * 0);
		--animate-in-links-delay: calc(var(--default-delay) + var(--default-stagger) * 1);
		--animate-in-contributions-delay: calc(
			var(--default-delay) + var(--default-stagger) * 5
		);
		--animate-in-readme-delay: calc(var(--default-delay) + var(--default-stagger) * 6);
		--animate-in-copy-delay: calc(var(--default-delay) + var(--default-stagger) * 7);
		--animate-in-graph-delay: calc(var(--default-delay) + var(--default-stagger) * 17);
	}
	
	[data-theme="dark"] {
		--color-text: var(--color-text-dark);
		--color-dot-bg-0: var(--color-dot-bg-0-dark);
		--color-dot-bg-1: var(--color-dot-bg-1-dark);
		--color-dot-bg-2: var(--color-dot-bg-2-dark);
		--color-dot-bg-3: var(--color-dot-bg-3-dark);
		--color-dot-bg-4: var(--color-dot-bg-4-dark);
		--color-dot-border: var(--color-dot-border-dark);
	}

	[data-theme="light"] {
		--color-text: var(--color-text-light);
		--color-dot-bg-0: var(--color-dot-bg-0-light);
		--color-dot-bg-1: var(--color-dot-bg-1-light);
		--color-dot-bg-2: var(--color-dot-bg-2-light);
		--color-dot-bg-3: var(--color-dot-bg-3-light);
		--color-dot-bg-4: var(--color-dot-bg-4-light);
		--color-dot-border: var(--color-dot-border-light);
	} 

	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
	}

	.wrapper {
		contain: strict;
		block-size: calc(var(--size-height) * 1px);
		container-type: inline-size;
		position: relative;
		overflow: clip;

		font-family: var(--font-family);
		color: var(--color-text);
	}

	/* Hide everything in Firefox by default – show fallback instead */
	@-moz-document url-prefix() {
		.wrapper {
			display: none;
		}
	}

	.label {
		contain: content;
		font-size: 14px;
		font-weight: 600;
	}

	.link {
		contain: content;
		font-size: 14px;
	}

	.fade-in {
		will-change: opacity;
		animation-name: fade-in;
		animation-fill-mode: both;
		animation-duration: var(--duration, var(--default-duration));
		animation-timing-function: var(--ease, ease-out);
		animation-delay: var(--delay, var(--default-delay));
	}

	p {
		constrain: content;
		margin: 0;
	}

	@keyframes fade-in {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	.shine {
		background-color: var(--color-text);
		background-image: linear-gradient(
			-75deg,
			rgb(0 0 0 / 0) 0%,
			rgb(255 255 255 / 0.18) 15%,
			rgb(0 0 0 / 0) 25%
		);
		background-size: 200%;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		text-fill-color: transparent;

		animation-name: shine;
		animation-duration: 14s;
		animation-iteration-count: infinite;
	}

	@keyframes shine {
		0% {
			background-position: 200%;
		}
		10% {
			background-position: 0%;
		}
		to {
			background-position: 0%;
		}
	}
`;

export function css(strings: TemplateStringsArray, ...values: any[]) {
	let str = baseStyles;

	strings.forEach((string, i) => {
		str += string + (values[i] ? values[i] : "");
	});

	return str;
}

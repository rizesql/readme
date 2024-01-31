import * as v from "valibot";

export type Year = {
	from: string;
	to: string;
	days: number[];
};

export const Section = v.union([
	v.literal("header"),
	v.literal("main"),
	v.literal("link.github"),
	v.literal("link.twitter"),
]);
const defaultSection = "fallback" as const;

export type Section = v.Output<typeof Section>;
export type SectionOrDefault = Section | typeof defaultSection;

export function parseSection(val: unknown) {
	if (!v.is(Section, val)) return defaultSection;

	return val;
}

export const Theme = v.union([v.literal("dark"), v.literal("light")]);
export type Theme = v.Output<typeof Theme>;

export function parseTheme(val: unknown) {
	if (!v.is(Theme, val)) return "light";

	return val;
}

export const Params = v.object({
	section: v.optional(Section),
});

export type Params = v.Output<typeof Params>;

export type Props = {
	theme: Theme;
	section: SectionOrDefault;
};

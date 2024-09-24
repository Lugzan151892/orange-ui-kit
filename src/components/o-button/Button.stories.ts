import { StoryFn, Meta } from "@storybook/vue3";
import OButton from "./OButton.vue";

export default {
	title: "OButton",
	component: OButton,
	argTypes: {
		disabled: {
			control: { type: "boolean" },
			defaultValue: false,
		},
		text: {
			control: { type: "text" },
			defaultValue: "testText",
		},
		fullWidth: {
			control: { type: "boolean" },
			defaultValue: false,
		},
		transparent: {
			control: { type: "boolean" },
			defaultValue: false,
		},
	},
} as Meta<typeof OButton>;

export const DefaultButton: StoryFn<typeof OButton> = (args) => ({
	components: { OButton },
	setup() {
		return { args };
	},
	template: '<OButton v-bind="args"></OButton>',
});

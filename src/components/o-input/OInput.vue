<template>
	<div>
		<div
			:class="{
				[$style[className]]: true,
				[$style[`${className}--error`]]: error,
			}"
			:style="inputStyles">
			<div v-if="$slots['icon-before']" class="o-ml-8" :class="$style[`${className}-iconbefore`]">
				<slot name="icon-before" />
			</div>
			<input
				:placeholder="placeholder"
				:style="{ color: props.color }"
				:type="computedType"
				:name="id"
				:id="id"
				:class="$style[`${className}-input`]"
				v-model="value"
				@change="handleChange($event)"
				@input="handleInput($event)" />
			<div
				v-if="props.type === 'password'"
				class="o-mx-10 o-pointer o-h-25 o-w-25"
				:class="$style[`${className}-iconafter`]"
				:style="{
					'background-image': `url(${showPassword ? passwordShow : passwordHide})`,
				}"
				@click="showPassword = !showPassword" />
		</div>
		<p class="o-ml-16 o-mt-2" :class="$style[`${className}-error`]">
			{{ error }}
		</p>
	</div>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import passwordHide from "@/assets/icons/password_hide.png";
import passwordShow from "@/assets/icons/password_show.png";

const className = "o-input";

const emit = defineEmits<{
	"update:modelValue": [text: string];
	input: [text: string];
	change: [text: string];
}>();
const props = withDefaults(
	defineProps<{
		type?: string;
		modelValue?: string;
		placeholder?: string;
		backgroundColor?: string;
		color?: string;
		error?: string;
		id?: string;
	}>(),
	{
		type: "text",
		modelValue: "",
		placeholder: "Введите ...",
		backgroundColor: "var(--background-second)",
		color: "var(--color-text)",
		error: "",
	}
);

const value = computed({
	get() {
		return props.modelValue;
	},
	set(val) {
		emit("update:modelValue", val);
	},
});

const showPassword = ref(false);

const userType = computed(() => (showPassword.value ? "text" : "password"));
const computedType = computed(() => (props.type === "password" ? userType.value : props.type));

const inputStyles = computed(() => ({
	...(props.backgroundColor && { "background-color": props.backgroundColor }),
	...(props.color && { color: `${props.color} !important` }),
}));

const handleInput = (e: Event) => {
	emit("input", (e.target as HTMLInputElement).value);
	value.value = (e.target as HTMLInputElement).value;
};

const handleChange = (e: Event) => {
	emit("change", (e.target as HTMLInputElement).value);
};
</script>
<style lang="scss" module>
$component: o-input;

.#{$component} {
	min-height: 52px;
	border-radius: 10px;
	display: grid;
	grid-template-columns: 30px 1fr max-content;
	align-items: center;
	column-gap: 5px;
	border: 2px solid transparent;

	&:has(input:focus) {
		border: 2px solid var(--main-color);
	}

	&:has(input:focus-visible) {
		border: 2px solid var(--main-color);
	}

	&--error {
		border: 2px solid var(--main-error) !important;
	}

	&-input {
		border: none;
		background: transparent;
		font-size: 16px;
		grid-area: 1 / 2 / 2 / 3;

		&::placeholder {
			color: inherit;
			text-align: left;
			opacity: 1;
		}

		&:focus {
			border: none;
			outline: none;
		}
	}

	&-iconafter {
		grid-area: 1 / 3 / 2 / 4;
	}

	&-error {
		color: var(--main-error);
	}
}
</style>

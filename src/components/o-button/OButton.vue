<template>
	<button
		:class="$style[className]"
		class="o-pointer o-m-auto"
		v-bind="$attrs"
		:style="styles"
		@click.stop="onClick()">
		<div
			:class="{
				[$style[`${className}-prepend`]]: true,
				'o-mr-10': $slots.default,
			}"
			v-if="$slots.prepend">
			<slot name="prepend" />
		</div>
		<slot>
			<div v-if="text" :class="$style[`${className}-text`]">
				{{ text }}
			</div>
		</slot>
		<div v-if="$slots.append" class="o-ml-10">
			<slot name="append" />
		</div>
	</button>
</template>
<script lang="ts" setup>
import { computed } from "vue";

const className = "o-button";
const emit = defineEmits(["click"]);
const props = withDefaults(
	defineProps<{
		text?: string;
		fullWidth?: boolean;
		transparent?: boolean;
		disabled?: boolean;
	}>(),
	{
		text: "",
		fullWidth: false,
		transparent: false,
		disabled: false,
	}
);

const styles = computed(() => ({
	...(props.fullWidth ? { width: "100%", "max-width": "100%" } : {}),
	...(props.transparent ? { "background-color": "transparent" } : {}),
	...(props.disabled ? { opacity: "0.4", cursor: "default" } : {}),
}));

const onClick = () => {
	if (props.disabled) {
		return;
	}
	emit("click");
};
</script>
<style lang="scss" module>
@use "@/styles/styles.scss";
@use "@/styles/variables.scss";

$component: o-button;

.#{$component} {
	border-radius: 10px;
	min-width: 0;
	min-height: 0;
	border: none;
	background-color: var(--background-orange);
	font-size: 16px;
	color: var(--main-white);
	max-width: fit-content;

	&-prepend {
		display: grid;
		align-items: center;
		justify-content: center;
	}

	&-text {
		font-size: 16px;
		font-weight: 500;
	}
}
</style>

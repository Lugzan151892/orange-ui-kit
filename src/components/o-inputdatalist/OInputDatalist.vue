<template>
	<div :class="$style[className]" class="ao-text">
		<RInput :list="id" :id="id" @input="$emit('input', $event)" @change="$emit('change', $event)" />
		<div class="o-wp-100" :class="$style[`${className}-option`]">
			<template v-for="item in options ?? []" :key="item.id">
				<div :class="$style[`${className}-option--item`]" class="o-py-4 o-px-8">
					<slot name="item" :item="item" @click="chooseOption(item.id)">
						{{ item.text }}
					</slot>
				</div>
			</template>
		</div>
	</div>
</template>

<script lang="ts" setup>
const className = "o-input-datalist";

defineEmits<{
	input: [text: string];
	"choose-option": [id: number];
	change: [text: string];
}>();

withDefaults(
	defineProps<{
		options?: Array<{ id: number; text: string }>;
		id: string;
	}>(),
	{
		options: () => [],
	}
);
</script>

<style lang="scss" module>
$component: "o-input-datalist";

.#{$component} {
	&-option {
		border: 1px solid var(--main-color);
		border-top: none;
		border-radius: 10px;
		max-height: 250px;
		&--item {
			display: flex;
			align-items: center;
			margin: auto 0;
			cursor: pointer;
			min-height: 35px;
			border-top: 1px solid var(--main-color);
			border-radius: 10px;
		}

		&--item:hover {
			background-color: var(--background-second);
		}
	}
}
</style>

<script lang="ts" context="module">
	export interface FormContext {
		(field: string, valid: boolean): void;
	}
</script>

<script lang="ts">
	import { setContext } from 'svelte';

	export let id: string = '';
	export let allValid: boolean = false;
	let fields: { [field: string]: boolean } = {};

	setContext<FormContext>('form', (field: string, valid: boolean) => {
		fields[field] = valid;
		allValid = Object.values(fields).every((v) => v);
	});
</script>


	<form {id}>
		<slot />
	</form>


<style global lang="postcss">
</style>

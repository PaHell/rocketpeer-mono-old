<script lang="typescript" context="module">
	import { setContext } from 'svelte';
	export interface FormContext {
		(field: string, valid: boolean): void;
	}
</script>

<script lang="typescript">
	export let id = '';
	export let allValid = false;
	let fields: { [field: string]: boolean } = {};
	let method: RequestInit["method"] = 'POST';

	setContext<FormContext>('form', (field: string, valid: boolean) => {
		fields[field] = valid;
		allValid = Object.values(fields).every((v) => v);
	});
</script>


	<form {id} action={method}>
		<slot />
	</form>


<style global lang="postcss">
</style>

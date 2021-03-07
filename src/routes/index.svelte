<script>
	import ExampleComponent from "../components/ExampleComponent.svelte";
</script>

<style>
	.centerer {
		@apply flex-1 flex flex-col items-center justify-center bg-dark;
	}
</style>

<div class:centerer={true}> <!-- Here's how you could extract conditional class groups with @apply -->
	<ExampleComponent
		title="🍗 TendieCalc"
		paragraph="How many tendies???" />
</div>

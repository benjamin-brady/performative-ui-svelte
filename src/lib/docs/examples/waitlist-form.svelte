<script lang="ts">
import Example from '$lib/docs/Example.svelte';
import WaitlistForm from '$lib/components/WaitlistForm.svelte';
</script>

<Example
title="Default"
code={`<WaitlistForm
  footnote="We email when something actually ships."
  onSubmit={(email) => createWaitlistEntry(email)}
/>`}
>
<WaitlistForm
footnote="We email when something actually ships."
onSubmit={(email: string) => alert('Welcome to the waitlist, ' + email)}
/>
</Example>

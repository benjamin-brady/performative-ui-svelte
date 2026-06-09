<script lang="ts">
import Example from '$lib/docs/Example.svelte';
import Button from '$lib/components/Button.svelte';
import Popover from '$lib/components/Popover.svelte';
import WaitlistForm from '$lib/components/WaitlistForm.svelte';

let open = $state(false);
let armed = $state(false);
let popKey = $state(0);
</script>

<Example
title="Newsletter signup nag"
code={`const [open, setOpen] = useState(false);

return (
  <>
    <Button onClick={() => setOpen(true)}>Open the popover</Button>
    <Popover
      open={open}
      onOpenChange={setOpen}
      title="Subscribe to my newsletter"
      closeLabel="No thanks, I haven't raised my seed round yet."
    >
      <WaitlistForm
        ctaLabel="Subscribe"
        footnote="Weekly. Reasonably unhinged."
        onSubmit={(email) => {
          subscribe(email);
          setOpen(false); // submitting closes it
        }}
      />
    </Popover>
  </>
);`}
>
<Button variant="ghost" onclick={() => (open = true)}>Open the popover</Button>
<Popover
{open}
onOpenChange={(next: boolean) => (open = next)}
title="Subscribe to my newsletter"
closeLabel="No thanks, I haven't raised my seed round yet."
>
<WaitlistForm
ctaLabel="Subscribe"
footnote="Weekly. Reasonably unhinged."
onSubmit={(email: string) => {
alert('Subscribed: ' + email);
open = false;
}}
/>
</Popover>
</Example>

<Example
title="Auto-open after a timer (arm to demo)"
code={`<Popover
  timer={3000}
  title="You've been here 3 seconds"
  closeLabel="No thanks, I haven't raised my seed round yet."
>
  <WaitlistForm onSubmit={…} />
</Popover>`}
>
{#if !armed}
<Button
variant="ghost"
onclick={() => {
popKey += 1;
armed = true;
}}
>
Arm 3-second timer
</Button>
{:else}
{#key popKey}
<Popover
timer={3000}
onOpenChange={(next: boolean) => {
if (!next) armed = false;
}}
title="You've been here 3 seconds"
closeLabel="No thanks, I haven't raised my seed round yet."
>
<p style="margin:0;color:var(--pui-fg-dim);line-height:1.55">
Now that we have your attention.
</p>
<WaitlistForm
ctaLabel="Subscribe"
onSubmit={(email: string) => {
alert('Subscribed: ' + email);
armed = false;
}}
/>
</Popover>
{/key}
{/if}
</Example>

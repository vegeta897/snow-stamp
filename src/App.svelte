<script>
    let snowflake
    let time
    function reset() {
        snowflake = ''
        update()
    }
    function update() {
        time = snowflake ? new Date((snowflake / 4194304) + 1420070400000) : null
    }
</script>

<main>
    <h1>❄ Discord Snowflake to Timestamp Converter</h1>
    <p>
        Paste in a Discord snowflake to get the timestamp<br />
        <a id="help-link">What is a snowflake?</a>
    </p>
    <input type="text" bind:value={snowflake} on:input={update} placeholder="e.g. 86913608335773696"/>
    <button on:click={reset}>Reset</button>
    {#if time}
        <p>{time.toLocaleString()}</p>
        <p>{time.getTime()/1000|0}</p>
        <p>{time.toISOString()}</p>
    {/if}
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    h1 {
        color: #0086ad;
        font-size: 4em;
        font-weight: 100;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>

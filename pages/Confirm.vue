<template>
    <div class="flex justify-center mt-15 text-white font-mono">
       Congrats! You have confirmed your email. We will send you a reminder at an appropriete date!
    </div>
</template>

<script setup>
    const url = useRequestURL();
    const nuxtApp = useNuxtApp();

    if (nuxtApp.ssrContext && url.searchParams.get('params') && url.searchParams.get('ts')) {
        try {
            await useFetch('/api/reminder', {
                method: 'POST',
                body: {
                    params: url.searchParams.get('params'),
                    ts: url.searchParams.get('ts')
                }
            });
        } catch (error) {
            console.log('err:', error);
        }
    }

</script>

<style>
    .text-paradise {
        color: rgb(0 220 130 / 1);
    }
    .border-paradise {
        border-color: rgb(0 220 130 / 1);
    }
</style>
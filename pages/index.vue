<template>
    <div class="mt-15">
        <div class="absolute">
            🎉
        </div>
        <div class="relative pointer-events-none">
            <div>
                <img src="https://masteringnuxt.com/images/apphero/stars-desktop.webp" class="w-full absolute top-0 hidden lg:block">
                <img src="https://masteringnuxt.com/images/apphero/stars-tablet.webp" class="w-full absolute top-0 hidden md:block lg:hidden">
                <img src="https://masteringnuxt.com/images/apphero/stars-mobile.webp" class="w-full absolute top-0 md:hidden">
            </div>
        </div>
        <div class="flex justify-center">
            <p class="text-paradise font-mono text-xl">
                Don't forget to congratulate your friend!
            </p>
        </div>
        <div class="flex justify-center">
            <p class="text-paradise font-mono text-xl">
                We will send you a reminder to your email.
            </p>
        </div>
        <div class="flex justify-center mt-20 font-mono">
            <div class="w-1/3 space-y-4">
                <form action="" method="post" @submit.prevent="submitForm">
                    <div class="flex flex-wrap text-paradise">
                        <div class="w-full">
                            <label for="email">Your email</label>
                            <input type="email" v-model="formFields.email" name="email" id="email" required class="w-full h-14 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline">
                        </div>
                    </div>

                    <div class="flex flex-wrap mt-9 text-paradise">
                        <div class="w-full pr-2 md:w-1/3">
                            <label for="day">Birthday</label>
                            <input type="text" v-model="formFields.day" name="day" id="day" required class="w-full h-14 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline">
                        </div>
                        <div class="w-full px-2 md:w-1/3">
                            <label for="month">Birth month</label>
                            <input type="text" v-model="formFields.month" name="month" id="month" required class="w-full h-14 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline">
                        </div>
                        <div class="w-full pl-2 md:w-1/3">
                            <label for="year">Birth year</label>
                            <input type="text" v-model="formFields.year" name="year" id="year" class="w-full h-14 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline">
                        </div>
                    </div>

                    <div class="flex flex-wrap mt-9 text-paradise">
                        <div class="w-full">
                            <label for="text">You could specify custom message which will be sent with a reminder</label>
                            <textarea name="text" v-model="formFields.text" id="text" cols="30" rows="10" class="w-full h-14 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"></textarea>
                        </div>
                    </div>

                    <div class="flex flex-wra mt-9 text-paradise">
                        <div class="w-full pr-2 pt-3 md:w-1/4">
                            <input type="text" v-model="formFields.daysBefore" name="daysBefore" id="daysBefore" class="w-full h-12 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline">
                        </div>
                        <label for="daysBefore">Specify days before you want to get a reminder. If not specified we will send you a reminder on the same day.</label>
                    </div>

                    <button type="submit" class="mt-10 border rounded border-paradise text-white cursor-pointer py-3 px-8 hover:border-white transition">Submit</button>
                    <div v-if="isSubmitted" class="mt-2 text-sm text-paradise">We have sent you an email with a confirmation link. Please confirm it to proceed.</div>
                    <div v-else class="mt-2 text-white text-sm">After submit a form you will get an email with confirmation. When confirm we will start to send your reminder</div>
                    <div v-if="errorMsg">{{errorMsg}}</div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
    const response = await useFetch('/api/test/', {
                method: 'POST',
                body: {}
            });

    const errorMsg = ref('');
    const isSubmitted = ref(false);
    const formFieldsInitial = reactive({
        email: '',
        day: '',
        month: '',
        year: '',
        daysBefore: '',
        text: ''
    });

    const formFields = reactive({ ...formFieldsInitial });

    async function submitForm() {
        const response = await useFetch('/api/confirm/', {
            method: 'POST',
            body: {
                ...formFields
            }
        });

        if (response.data.value.error) {
            errorMsg.value = 'Sorry, something went wrong. Please try again';
            return;
        }

        isSubmitted.value = true;
        setTimeout(() => {
            isSubmitted.value = false;
        }, 3000)
        resetForm();
    }

    function resetForm() {
      Object.assign(formFields, formFieldsInitial);
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
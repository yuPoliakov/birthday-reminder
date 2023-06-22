<template>
    <div class="mt-15">
        <!-- <div class="relative pointer-events-none">
            <div class="absolute sm:hidden md:block md:top-[2vh] md:left-[8vh] w-5">🎉</div>

            <div class="absolute sm:hidden lg:block lg:top-[20vh] lg:left-[20vh] w-5">🎉</div>

            <div class="absolute sm:hidden lg:block lg:top-[60vh] lg:left-[40vh] w-5">🎉</div>

            <div class="absolute sm:hidden lg:block lg:top-[78vh] lg:left-[12vh] w-5">🎉</div>

            <div class="absolute sm:hidden lg:block lg:top-[-4vh] lg:left-[48vh] w-5">🎉</div>

            <div class="absolute sm:hidden lg:block lg:top-[8vh] lg:left-[78vh] w-5">🎉</div>

            <div class="absolute sm:hidden lg:block lg:top-[5vh] lg:right-[39vh] w-5">🎉</div>

            <div class="absolute sm:hidden lg:block lg:top-[20vh] lg:right-[20vh] w-5">🎉</div>

            <div class="absolute sm:hidden lg:block lg:top-[49vh] lg:right-[58vh] w-5">🎉</div>

            <div class="absolute sm:hidden lg:block lg:top-[39vh] lg:right-[38vh] w-5">🎉</div>

            <div class="absolute sm:hidden lg:block lg:top-[75vh] lg:right-[20vh] w-5">🎉</div>
        </div> -->
        <div class="flex justify-center">
            <p class="text-paradise font-mono text-xl pl-2">
                Don't forget to congratulate your friend!
            </p>
        </div>
        <div class="flex justify-center">
            <p class="text-paradise font-mono text-xl pl-2">
                We will send you a reminder to your email.
            </p>
        </div>
        <div class="flex justify-center mt-20 font-mono">
            <div class="w-3/4 sm:w-2/3 lg:w-1/3 sm:space-y-4">
                <form action="" method="post" @submit.prevent="submitForm">
                    <div class="flex flex-wrap text-paradise">
                        <div class="w-full">
                            <label for="email">Your email</label>
                            <input type="email" v-model="formFields.email" name="email" id="email" required class="w-full h-14 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline">
                        </div>
                    </div>

                    <div class="flex flex-wrap mt-9 text-paradise">
                        <div class="w-3/4 sm:pr-2 sm:w-1/3">
                            <label for="day">Birthday</label>
                            <input type="text" v-model="formFields.day" name="day" id="day" required class="w-full h-14 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline">
                        </div>
                        <div class="w-3/4 sm:px-2 sm:w-1/3">
                            <label for="month">Birth month</label>
                            <input type="text" v-model="formFields.month" name="month" id="month" required class="w-full h-14 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline">
                        </div>
                        <div class="w-3/4 sm:pl-2 sm:w-1/3">
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

                    <div class="flex flex-wrap mt-9 text-paradise">
                        <div class="w-2/12 pr-2 sm:w-1/12">
                            <input type="text" v-model="formFields.daysBefore" name="daysBefore" id="daysBefore" class="w-full h-12 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline">
                        </div>
                        <div class="w-10/12 pr-2 sm:w-11/12">
                            <label for="daysBefore">Specify days before you want to get a reminder. If not specified we will send you a reminder on the same day.</label>
                        </div>
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
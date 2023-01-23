<script setup>

import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Routing 

const router = useRouter();

// Reactive data

const submitInProgress = ref(false);
const name = ref('');
const password = ref('');
const message = ref('');
const submitErrors = ref([]);

// Data
const mockApiEndpoint = 'https://blackfur.free.beeceptor.com/';
const mockApiRequests = ['success', 'validationerror', 'othererror'];

// Methods

/**
 * Get random request for the API call.
 */
function randomRequest() {
    return mockApiRequests[Math.floor(Math.random() * mockApiRequests.length)];
}

/**
 * Send the form.
 */
async function sendForm() {

    removeSubmitErrors();

    if (!formValidated()) {
        return false;
    }

    submitInProgress.value = true;

    let axiosResponse = await axios({
        method: 'POST',
        url: mockApiEndpoint + randomRequest(),
        data: {
            name: name.value,
            password: password.value,
            message: message.value
        },
    })
        .then((response) => {
            router.push({
                name: 'success',
            });
        })
        .catch(function (error) {
            if (error.response.status == 422) {

                let errors = error.response.data.errors;

                Object.entries(errors).forEach(([key, error]) => {
                    submitErrors.value.push(error.message);
                });

            } else {
                submitErrors.value.push('Something went wrong.');
            }

        })
        .then(function () {
            submitInProgress.value = false;
        });
}

/**
 * Remove submit errors.
 */
function removeSubmitErrors() {
    submitErrors.value.splice(0);
}

/**
 * Validate form input data.
 */
function formValidated() {

    // Validate name
    if (!(name.value.length >= 1 && name.value.length <= 255) || !name.value.match(/^[A-Za-z]+$/)) {
        submitErrors.value.push('Correct your name.');
    }

    // Validate password
    if (!(password.value.length >= 8 && password.value.length <= 255)) {
        submitErrors.value.push('Correct your password.');
    }

    // Validate message
    if (!(message.value.length >= 1 && message.value.length <= 65535)) {
        submitErrors.value.push('Correct your message.');
    }

    if (submitErrors.value.length > 0) {
        return false;
    }

    return true;

}

</script>

<template>
    <div class="container">
        <div class="row my-4 justify-content-center">
            <div class="col-12 ">
                <div class="card">
                    <div class="card-header text-center text-bg-secondary py-2">
                        The Form
                    </div>
                    <div class="card-body p-4">
                        <form v-on:keyup.enter="sendForm()" v-on:input="removeSubmitErrors()">
                            <div class="row gy-3">
                                <div class="col-12">
                                    <input type="text" id="name" class="form-control bg-secondary-subtle" minlength="1"
                                        maxlength="255" placeholder="Your name" required v-model.trim="name">
                                </div>
                                <div class="col-12">
                                    <input type="password" id="password" class="form-control bg-secondary-subtle"
                                        minlength="8" maxlength="255" placeholder="Your password (min. 8 chars)"
                                        required v-model.trim="password">
                                </div>
                                <div class="col-12">
                                    <textarea id="message" class="form-control bg-secondary-subtle" minlength="1"
                                        maxlength="65535" rows="14" placeholder="Your message" required
                                        v-model.trim="message"></textarea>
                                </div>
                                <div class="col-12" v-if="submitErrors.length > 0">
                                    <ul class="list-group list-group-flush">
                                        <li v-for="(submitError, index) in submitErrors" :key="index"
                                            class="list-group-item ps-0 pb-0 text-danger small border-0 fw-bold"
                                            :class="{ 'pt-0': index === 0 }">
                                            • {{ submitError }}</li>
                                    </ul>
                                </div>
                                <div class="col-12">
                                    <button type="button" v-on:click="sendForm()" class="btn btn-success w-100"
                                        v-bind:class="{ disabled: submitInProgress }"
                                        v-text="submitInProgress ? 'Please wait...' : 'Submit'"></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
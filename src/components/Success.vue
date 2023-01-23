<template>
    <div class="container">
        <div class="row my-4 justify-content-center">
            <div class="col-12 text-center">
                <h4 class="text-success">
                    Your form has been sent!
                </h4>
                <router-link class="mt-4" :to="{ name: 'form' }">
                    Go back
                </router-link>
            </div>
        </div>
    </div>
</template>
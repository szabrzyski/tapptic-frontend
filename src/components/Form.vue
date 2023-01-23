<template>
    <div class="container">
        <div class="row my-4 justify-content-center">
            <div class="col-12 ">
                <div class="card">
                    <div class="card-header text-center text-bg-secondary py-2">
                        The Form
                    </div>
                    <div class="card-body p-4">
                        <form v-on:keyup.enter="">
                            <div class="row gy-3">
                                <div class="col-12">
                                    <input type="text" id="name" class="form-control bg-secondary-subtle" minlength="1"
                                        maxlength="255" placeholder="Your name" required>
                                </div>
                                <div class="col-12">
                                    <input type="password" id="password" class="form-control bg-secondary-subtle"
                                        minlength="8" maxlength="255" placeholder="Your password" required>
                                </div>
                                <div class="col-12">
                                    <textarea id="message" class="form-control bg-secondary-subtle" minlength="1"
                                        maxlength="65535" rows="14" placeholder="Your message" required></textarea>
                                </div>
                                <div class="col-12">
                                    <button type="button" v-on:click="" class="btn btn-success w-100"
                                        v-bind:class="{ disabled: 1 == 2 }"
                                        v-text="1 == 2 ? 'Please wait...' : 'Submit'"></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
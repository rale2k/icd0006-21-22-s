<template>
    <div class="form-identity form-signin">
        <h1 class="h3 mb-3 fw-normal">Sign in</h1>

        <div class="form-floating">
            <input v-model="email" class="form-control form-control-top" id="floatingEmail" :class="{ 'is-invalid': error != '' }" type="email" placeholder="name@example.com">
            <label for="floatingEmail">Email</label>
        </div>
        <div class="form-floating">
            <input v-model="password" class="form-control form-control-bottom" id="floatingPass" :class="{ 'is-invalid': error != '' }" type="password" placeholder="Password">
            <label for="floatingPass">Password</label>
            <div class="invalid-feedback">
                <template v-if="error != ''">{{ error }}</template>
            </div>
        </div>

        <div class="checkbox mb-3">
        <!-- <label>
            <input type="checkbox" value="remember-me"> Remember me
        </label> -->
        </div>
        <button class="w-100 btn btn-lg btn-primary" @click="handleLoginSubmit()">Sign in</button>
    </div>
</template>

<script lang="ts">
import IdentityService from "@/services/IdentityService";
import { Vue } from "vue-class-component";
export default class Login extends Vue {
   
    email: string = '';
    password: string = '';
    error: string = '';

    async handleLoginSubmit() {
        await IdentityService.login(this.email, this.password)
            .then((res) => {
                if (!res.success) {
                    this.error = res.errors!.error[0];
                    console.log(res)
                    return;
                }
                this.$router.push({ name: 'home'});
            }
            ).catch((res) => {
                console.log(res);
            }
        );
    }

}
</script>

<style>
</style>
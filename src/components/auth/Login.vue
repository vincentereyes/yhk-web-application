<template>
    <div class="login container">
        <form @submit.prevent="login()" class="card-panel">
            <h2 class="center">Login</h2>
            <div class="field">
                <label for="email">Email:</label>
                <input type="email" name="email" v-model="email" required>
            </div>
            <div class="field">
                <label for="password">Password:</label>
                <input type="password" name="password" v-model="password" required>
            </div>
            <div class="forgot-link center">
                <span @click="forgotPassword()">Forgot Password?</span>
            </div>
            <p class="red-text center" v-if="feedback">{{ feedback }}</p>
            <div class="field center">
                <button class="btn">Login</button>
            </div>
        </form>
    </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init'
export default {
    name: 'Login',
    data() {
        return {
            email: null,
            password: null,
            feedback: null
        }
    },
    methods: {
        login() {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then(cred => {
                db.collection('users').doc(cred.user.uid).get()
                .then(doc => {
                    let data = doc.data()
                    this.$store.user.set(data.fname, data.lname, data.jobGrade, data.department)
                    this.$router.push({ name: 'Index'})
                })
            }).catch(err => {
                this.feedback = err.message
            })
        },
        forgotPassword() {
            if (this.email) {
                firebase.auth().sendPasswordResetEmail(this.email)
                .then(() => {
                    alert('Password reset email sent!')
                }).catch(err => {
                    this.feedback = err.message
                })
                
            } else {
                this.feedback = "Please enter your email to reset password"
            }
            
        }
    }
}
</script>

<style>
.login {
    max-width: 400px;
    margin-top: 60px;
}
.login h2 {
    font-size: 2.4em;
    color: #0500fb;
}
.login .field {
    margin-bottom: 16px;
}
.btn {
    margin-top: 8px;
    background-color: #0500fb;
}
.btn:active {
    background-color: #1976d2
}
.btn:focus { 
    background-color: #1976d2
}
.btn:hover {
    background-color: #1976d2
}
.forgot-link {
    font-size: .8em;
    margin-bottom: 5px;
    text-decoration: underline;
    color: #f40604
}
.forgot-link:hover {
    cursor: pointer;
}
</style>
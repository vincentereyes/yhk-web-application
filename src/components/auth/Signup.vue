<template>
    <div class="signup">
        <ul class="breadcrumbs">
            <div class="container">
                <li><router-link :to="{ name: 'Index'}">Home</router-link></li>
                <li><router-link :to="{ name: 'Users'}">Users</router-link></li>
                <li>Add User</li>
            </div>
        </ul>
        <div class="container center signupForm">
            <form @submit.prevent="signup()" class="card-panel " >
                <h2 class="center">Add User</h2>
                <div class="field">
                    <label for="fname">First Name:</label>
                    <input type="text" name="fname" v-model="fname" required>
                </div>
                <div class="field">
                    <label for="lname">Last Name:</label>
                    <input type="text" name="lname" v-model="lname" required>
                </div>
                <div class="field">
                    <label for="email">Email:</label>
                    <input type="email" name="email" v-model="email" required>
                </div>
                <div class="field">
                    <label for="jobGrade">Job Grade:</label>
                    <select class="browser-default" name="jobGrade" v-model="jobGrade" required>
                        <option value="" disabled selected>Choose your option</option>
                        <option value="L1">L1</option>
                        <option value="L2">L2</option>
                        <option value="L3">L3</option>
                        <option value="L4">L4</option>
                        <option value="L5">L5</option>
                        <option value="L6">L6</option>
                        <option value="L7">L7</option>
                        <option value="L8">L8</option>
                        <option value="L9">L9</option>
                    </select>
                </div>
                <div class="field">
                    <label for="department">Department:</label>
                    <select class="browser-default" name="department" v-model="department" required>
                        <option value="" disabled selected>Choose your option</option>
                        <option value="Finance">Finance</option>
                        <option value="Operations">Operations</option>
                        <option value="Admin">Admin</option>
                        <option value="Management">Management</option>
                        <option value="Brokerage">Brokerage</option>
                        <option value="Forwarding">Forwarding</option>
                        <option value="Trucking">Trucking</option>
                        <option value="Warehouseing">Warehouseing</option>
                        <option value="Security">Security</option>
                        <option value="Technical">Technical</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>
                <p class="red-text center" v-if="feedback">{{ feedback }}</p>
                <div class="field center">
                    <button class="btn">Signup</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
    name: 'Signup',
    data() {
        return {
            fname: null,
            lname: null,
            email: null,
            department: null,
            jobGrade: null,
            feedback: null
        }  
    },
    methods: {
        signup() {
            
            let authWorkerApp = this.getFirebaseApp('auth-worker')
            let authWorkerAuth = firebase.auth(authWorkerApp);
            authWorkerAuth.setPersistence(firebase.auth.Auth.Persistence.NONE); // disables caching of account credentials

            authWorkerAuth.createUserWithEmailAndPassword(this.email, this.generatePassword())
            .then(cred => {
                let ref = db.collection('users').doc(cred.user.uid)
                ref.get().then(doc => {
                    ref.set({
                        fname: this.fname,
                        lname: this.lname,
                        department: this.department,
                        jobGrade: this.jobGrade,

                    }).then(() => {
                        firebase.auth().sendPasswordResetEmail(this.email)
                        .then(() => {
                            alert('Succesfully added user and email sent!')
                        }).catch(err => {
                            this.feedback = err.message
                        })
                        this.fname = null,
                        this.lname = null,
                        this.email = null,
                        this.department = null,
                        this.jobGrade = null,
                        this.feedback = null
                    }).catch(err => {
                        this.feedback = err.message
                    })
                })
            }).catch(err => {
                this.feedback = err.message
            })
        },
        getFirebaseApp(name, config) {
            let foundApp = firebase.apps.find(app => app.name === name);
            return foundApp ? foundApp : firebase.initializeApp(config || firebase.app().options, 'auth-worker');
        },
        generatePassword() {
            var length = 8,
                charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
                retVal = "";
            for (var i = 0, n = charset.length; i < length; ++i) {
                retVal += charset.charAt(Math.floor(Math.random() * n));
            }
            return retVal;
        }
    },
    created() {

    }
}
</script>

<style>
.signup .signupForm{
    max-width: 400px;
    margin-top: 20px;
}
.signup h2 {
    color: #0500fb;
    font-size: 2.4em;
}
.btn {
    margin-top: 8px;
    background-color: #0500fb;
}
.btn:focus{ 
  background-color: #1976d2
}
.signup select {
    margin-top: 5px;
}

</style>
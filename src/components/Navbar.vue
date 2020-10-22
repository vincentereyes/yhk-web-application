<template>
    <div class="navbar">
        <!-- <nav class="nav-extended indigo darkened-2">
            <div class="nav-content">
                <span class="nav-title">YHK</span>
                <ul class="right">
                    <li><router-link :to="{ name: Index }"><span>Home</span></router-link></li>
                </ul>
            </div>
        </nav> -->
        <nav class="nav-extended">
            <div class="nav-wrapper container">
                <span class="brand-logo">YHK</span>
                <ul id="nav-mobile" class="right">
                    <li v-if="user"><router-link :to="{ name: 'Index' }"><span>Home</span></router-link></li>
                    <!-- <li v-if="!user"><router-link :to="{ name: 'Login' }">Login</router-link></li> -->
                    <li v-if="user"><a @click="logout()">Logout</a></li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init'

export default {
    name: 'Navbar',
    data() {
        return {
            user: null
        }
    },
    methods: {
        logout() {
            firebase.auth().signOut()
            .then(() => {
                this.$router.push({ name: 'Login' })
                
            })
        },
        setUserData() {
            if (this.user) {
                db.collection('users').doc(this.user.uid).get()
                .then(doc => {
                    let data = doc.data()
                    this.$store.user.set(data.fname, data.lname, data.jobGrade, data.department)
                })
            }
            
            
        }
    },
    created() {
        
        
        //listen to firebase authentication state changes
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.user = user
                //If user presses refresh, reset global variable
                if (this.$store.user.fname == null) {
                    this.setUserData()
                }
            } else {
                this.user = null
            }
        })

        
    }
}
</script>

<style>
.navbar nav {
    padding: 0 20px;
}
.nav-extended {
    /* background-color: #0500fb; */
    background-color: #212121;
}

</style>
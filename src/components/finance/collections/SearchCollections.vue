<template>
    <div class="search-collections">
        <ul class="breadcrumbs">
            <div class="container">
                <li><router-link :to="{ name: 'Index'}">Home</router-link></li>
                <li><router-link :to="{ name: 'Finance'}">Finance</router-link></li>
                <li>Collections</li>
            </div>
        </ul>
        <div class="collectionsTable" v-if="$store.user.jobGrade == 'L9' || $store.user.jobGrade == 'L8' || $store.user.jobGrade == 'L7' || $store.user.jobGrade == 'L4'">
            <h5>Recent Collection Entries</h5>
            <table id="collectionsTable" class="responsive-table striped">
                <thead>
                    <tr>
                        <th>A.R / O.R Date</th>
                        <th>A.R / O.R No.</th>
                        <th>Client</th>
                        <th>Ref.</th>
                        <th>Currency</th>
                        <th>Total Billing Amount</th>
                        <th>EWT</th>
                        <th>ADVANCES</th>
                        <th>Amount Collected</th>
                        <th>Cash</th>
                        <th>Check</th>
                        <th>Check Amount</th>
                        <th>Check Number</th>
                        <th>Bank Deposited</th>
                        <th>Remarks</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="collection in lastTenCollections" :key="collection.id">
                        <td>{{ convertDate(collection.date) }}</td>
                        <td>{{ collection.arOrNo }}</td>
                        <td>{{ collection.client }}</td>
                        <td>{{ collection.ref }}</td>
                        <td>{{ collection.currency }}</td>
                        <td>{{ collection.totalBillingAmount }}</td>
                        <td>{{ collection.ewt }}</td>
                        <td>{{ collection.advances }}</td>
                        <td>{{ collection.amountCollected }}</td>
                        <td>{{ collection.cashAmount }}</td>
                        <td>{{ collection.check }}</td>
                        <td>{{ collection.checkAmount }}</td>
                        <td>{{ collection.checkNumber }}</td>
                        <td>{{ collection.bankDeposited }}</td>
                        <td>{{ collection.remarks }}</td>
                        <td>
                            <div v-if="$store.user.jobGrade == 'L8' || $store.user.jobGrade == 'L9'">
                                <router-link :to=" { name: 'ViewCollection2', params: { collection: collection }} ">
                                    <i class="material-icons visibility">visibility</i>
                                </router-link>
                                <router-link :to=" { name: 'EditCollection2', params: { collection: collection } } ">
                                    <i class="material-icons edit">edit</i>
                                </router-link>
                                <i class="material-icons delete" @click="deleteCollection(collection.id)">delete</i>
                            </div>
                            <div v-else-if="$store.user.jobGrade == 'L7'">
                                <router-link :to=" { name: 'ViewCollection2', params: { collection: collection }} ">
                                    <i class="material-icons visibility">visibility</i>
                                </router-link>
                                <router-link :to=" { name: 'EditCollection2', params: { collection: collection } } ">
                                    <i class="material-icons edit">edit</i>
                                </router-link>
                            </div>
                            <div v-else>
                                <router-link :to=" { name: 'ViewCollection2', params: { collection: collection }} ">
                                    <i class="material-icons visibility">visibility</i>
                                </router-link>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <hr>
        </div>

        <div class="container center">
            <div class="card-panel add" v-if="$store.user.jobGrade == 'L3' || $store.user.jobGrade == 'L7' || $store.user.jobGrade == 'L4' || $store.user.jobGrade == 'L8' || $store.user.jobGrade == 'L9'">
                <div class="field center">
                    <h2 class="center">Add Collection</h2>
                    <router-link :to="{ name: 'AddCollection' }">
                        <button class="btn">Add</button>
                    </router-link>
                </div>
            </div>
            <form @submit.prevent="search()" class="card-panel date" v-if="$store.user.jobGrade == 'L9' || $store.user.jobGrade == 'L8' || $store.user.jobGrade == 'L7' || $store.user.jobGrade == 'L4'">
                <h2 class="center">Filter Collections:</h2>
                <div class="field">
                    <label for="startDate">Start Date:</label>
                    <input type="date" name="startDate" v-model="startDate" required>
                </div>
                <div class="field">
                    <label for="endDate">End Date:</label>
                    <input type="date" name="endDate" v-model="endDate" required>
                </div>
                <p class="red-text center" v-if="feedback">{{ feedback }}</p>
                <div class="field center">
                    <button class="btn">Submit</button>
                </div>
            </form>
        </div>
        
        
    </div>
</template>

<script>
import db from '@/firebase/init'
export default {
    name: 'SearchCollections',
    props: ['userData'],
    data() {
        return {
            startDate: null,
            endDate: null,
            feedback: null,
            phpCollections: [],
            usdCollections: [],
            lastTenCollections: [],
            convertDate(timestamp) {
                var myDate = new Date(timestamp.seconds * 1000)
                var year = myDate.getFullYear()
                var month = myDate.getMonth() + 1
                var date = myDate.getDate()

                return month + "/" + date + "/" + year
            }
        }
    },
    created() {
        
        if (this.$store.user.jobGrade != "L3") {
            db.collection('collections').orderBy('date', 'desc').limit(10)
            .get().then(snapshot => {
                snapshot.forEach(doc => {
                    this.lastTenCollections.push({
                        id: doc.id,
                        advances: doc.data().advances,
                        amountCollected: doc.data().amountCollected,
                        arOrNo: doc.data().arOrNo,
                        bankDeposited: doc.data().bankDeposited,
                        cashAmount: doc.data().cashAmount,
                        check: doc.data().check,
                        checkAmount: doc.data().checkAmount,
                        checkNumber: doc.data().checkNumber,
                        client: doc.data().client,
                        currency: doc.data().currency,
                        date: doc.data().date,
                        ewt: doc.data().ewt,
                        logs: doc.data().logs,
                        ref: doc.data().ref,
                        remarks: doc.data().remarks,
                        totalBillingAmount: doc.data().totalBillingAmount
                    })
                })
            }).catch(err => {
                console.log(err.message)
            })
        }
    },
    methods: {
        search() {
            if (new Date(this.endDate) < new Date(this.startDate)) {
                this.feedback = 'Invalid Start/End Date'
                this.startDate = null
                this.endDate = null
            } 
            else {
                db.collection('collections').where('date', '>=', new Date(this.startDate)).where('date', '<=', new Date(this.endDate)).orderBy('date')
                .get().then(snapshot => {
                        snapshot.forEach(doc => {
                            if (doc.data().currency == "PHP") {
                                this.phpCollections.push({
                                id: doc.id,
                                advances: doc.data().advances,
                                amountCollected: doc.data().amountCollected,
                                arOrNo: doc.data().arOrNo,
                                bankDeposited: doc.data().bankDeposited,
                                cashAmount: doc.data().cashAmount,
                                check: doc.data().check,
                                checkAmount: doc.data().checkAmount,
                                checkNumber: doc.data().checkNumber,
                                client: doc.data().client,
                                currency: doc.data().currency,
                                date: doc.data().date,
                                ewt: doc.data().ewt,
                                logs: doc.data().logs,
                                ref: doc.data().ref,
                                remarks: doc.data().remarks,
                                totalBillingAmount: doc.data().totalBillingAmount
                                })
                            } else {
                                this.usdCollections.push({
                                id: doc.id,
                                advances: doc.data().advances,
                                amountCollected: doc.data().amountCollected,
                                arOrNo: doc.data().arOrNo,
                                bankDeposited: doc.data().bankDeposited,
                                cashAmount: doc.data().cashAmount,
                                check: doc.data().check,
                                checkAmount: doc.data().checkAmount,
                                checkNumber: doc.data().checkNumber,
                                client: doc.data().client,
                                currency: doc.data().currency,
                                date: doc.data().date,
                                ewt: doc.data().ewt,
                                logs: doc.data().logs,
                                ref: doc.data().ref,
                                remarks: doc.data().remarks,
                                totalBillingAmount: doc.data().totalBillingAmount
                                })
                            }
                            
                            
                        })
                        this.$router.push({ name: 'Collections', params: { phpCollections: this.phpCollections, usdCollections: this.usdCollections } })
                }).catch(err => {
                    this.feedback = err.message
                    })
                
            }
        },
        deleteCollection(id) {
            if(confirm("Delete collection?")) {
                db.collection('collections').doc(id).delete()
                .then(() => {
                    this.lastTenCollections = this.lastTenCollections.filter(collection => {
                    return collection.id != id
                    })
                })
            }
        }
    }
}
</script>

<style>
.search-collections .card-panel {
    max-width: 400px;
    display: inline-block;
    vertical-align: top;
}
.date {
    margin-left: 40px;
}
.search-collections h2 {
    font-size: 2.4em;
    color: #0500fb;
}
.search-collections .field {
    margin-bottom: 16px;
}
.search-collections .delete {
    cursor: pointer;
    color: #b71c1c;
}
.collectionsTable h5 {
    margin-left: 20px;
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

</style>
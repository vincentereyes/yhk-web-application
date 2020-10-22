<template>
    <div class="add-collection">
        <ul class="breadcrumbs">
            <div class="container">
                <li><router-link :to="{ name: 'Index'}">Home</router-link></li>
                <li><router-link :to="{ name: 'Finance'}">Finance</router-link></li>
                <li><router-link :to="{ name: 'SearchCollections'}">Collections</router-link></li>
                <li>Add Collection</li>
            </div>
        </ul>
        <div class="container">
            <h4 class="center-align">Add New Collection</h4>
            <div class="row">
                <form class="col s12" @submit.prevent="addCollection()">
                    <div class="row">
                        <div class="field col s6">
                            <label for="date">A.R / O.R Date</label>
                            <input type="date" name="date" v-model="date" required>
                        </div>
                        <div class="field col s6">
                            <label for="arorno">A.R / O.R No.</label>
                            <input type="text" name="arorno" v-model="arOrNo" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="field col s6">
                            <label for="client">Client</label>
                            <input type="text" name="client" v-model="client" required>
                        </div>
                        <div class="field col s6">
                            <label for="ref">Ref</label>
                            <input type="text" name="ref" v-model="ref" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="field col s6">
                            <label for="currency">Currency:</label>
                            <select name="currency" class="browser-default" v-model="currency" required>
                                <option value="" disabled selected>Choose your option</option>
                                <option value="PHP">PHP</option>
                                <option value="USD">USD</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="field col s6">
                            <label for="totalBillingAmount">Total Billing Amount</label>
                            <input type="number" name="totalBillingAmount" v-model="totalBillingAmount" required>
                        </div>
                        <div class="field col s6">
                            <label for="ewt">EWT</label>
                            <input type="number" name="ewt" v-model="ewt" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="field col s6">
                            <label for="amountCollected">Amount Collected</label>
                            <input type="number" name="amountCollected" :value="total" disabled>
                        </div>
                        <div class="field col s6">
                            <label for="advances">ADVANCES</label>
                            <input type="number" name="advances" v-model="advances" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="field col s6">
                            <label for="cashAmount">Cash Amount: </label>
                            <input type="number" name="cashAmount" v-model="cashAmount" required>
                        </div>
                        <div class="field col s6">
                            <label for="check">Check</label>
                            <input type="text" name="check" v-model="check" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="field col s6">
                            <label for="checkAmount">Check Amount: </label>
                            <input type="number" name="checkAmount" v-model="checkAmount" required>
                        </div>
                        <div class="field col s6">
                            <label for="checkNumber">Check Number: </label>
                            <input type="text" name="checkNumber" v-model="checkNumber" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="field col s6">
                            <label for="bankDeposited">Bank Deposited</label>
                            <select class="browser-default" name="bankDeposited" v-model="bankDeposited" required>
                                <option value="" disabled selected>Choose your option</option>
                                <option value="AUB">AUB</option>
                                <option value="BDO">BDO</option>
                                <option value="BPI">BPI</option>
                                <option value="MetroBank">MetroBank</option>
                                <option value="Sterling">Sterling</option>
                            </select>
                        </div>
                        <div class="field col s6">
                            <label for="remarks">Remarks</label>
                            <input type="text" name="remarks" v-model="remarks" required>
                        </div>
                    </div>
                    <div class="field center-align">
                        <button class="btn">Submit</button>
                    </div>           
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init'
export default {
    name: 'AddCollection',
    data() {
        return {
            date: null,
            arOrNo: null,
            client: null,
            ref: null,
            totalBillingAmount: null,
            ewt: null,
            advances: null,
            amountCollected: null,
            cashAmount: null,
            check: null,
            checkAmount: null,
            checkNumber: null,
            currency: null,
            bankDeposited: null,
            remarks: null
        }
    },
    methods: {
        addCollection() {
            
            db.collection('collections').add({
                advances: parseFloat(this.advances),
                amountCollected: this.amountCollected,
                arOrNo: this.arOrNo,
                bankDeposited: this.bankDeposited,
                cashAmount: parseFloat(this.cashAmount),
                check: parseFloat(this.check),
                checkAmount: parseFloat(this.checkAmount),
                checkNumber: this.checkNumber,
                currency: this.currency,
                client: this.client,
                date: new Date(this.date),
                ewt: parseFloat(this.ewt),
                ref: this.ref,
                remarks: this.remarks,
                totalBillingAmount: parseFloat(this.totalBillingAmount),
                logs: [{
                    timestamp: Date.now(),
                    name: this.$store.user.fname + " " + this.$store.user.lname,
                    info: "Created Collection Record"
                }]
            }).then(() => {
                this.$router.push({ name: 'SearchCollections' })
            }).catch(err => {
                console.log(err)
            })
        }
    },
    computed: {
        total: function() {
            let calculatedTotal = this.totalBillingAmount - this.ewt
            this.amountCollected = calculatedTotal

            return calculatedTotal
        }
    },
    created() {
        
    }
}
</script>

<style>
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
.add-collection select{
    margin-top: 5px;
}
</style>
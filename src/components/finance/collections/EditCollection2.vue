<template>
    <div class="edit-collection">
        <ul class="breadcrumbs">
            <div class="container">
                <li><router-link :to="{ name: 'Index'}">Home</router-link></li>
                <li><router-link :to="{ name: 'Finance'}">Finance</router-link></li>
                <li><router-link :to="{ name: 'SearchCollections'}">Collections</router-link></li>
                <li>Edit Collection {{ collection.ref }}</li>
            </div>
        </ul>
        <div class="container">
            <h4 class="center-align">Edit Collection {{ collection.ref}}</h4>
            <div class="row">
                <form class="col s12" @submit.prevent="editCollection()">
                    <div class="row">
                        <div class="field col s6">
                            <label for="date">A.R / O.R Date</label>
                            <input type="date" name="date" v-model="datePlaceholder" required>
                        </div>
                        <div class="field col s6">
                            <label for="arorno">A.R / O.R No.</label>
                            <input type="text" name="arorno" v-model="collection.arOrNo" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="field col s6">
                            <label for="client">Client</label>
                            <input type="text" name="client" v-model="collection.client" required>
                        </div>
                        <div class="field col s6">
                            <label for="ref">Ref</label>
                            <input type="text" name="ref" v-model="collection.ref" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="field col s6">
                            <label for="currency">Currency:</label>
                            <select name="currency" class="browser-default" v-model="collection.currency" required>
                                <option value="" disabled selected>Choose your option</option>
                                <option value="PHP">PHP</option>
                                <option value="USD">USD</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="field col s6">
                            <label for="totalBillingAmount">Total Billing Amount</label>
                            <input type="number" name="totalBillingAmount" v-model="collection.totalBillingAmount" required>
                        </div>
                        <div class="field col s6">
                            <label for="ewt">EWT</label>
                            <input type="text" name="ewt" v-model="collection.ewt" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="field col s6">
                            <label for="amountCollected">Amount Collected</label>
                            <input type="number" name="amountCollected" :value="total" disabled>
                        </div>
                        <div class="field col s6">
                            <label for="advances">ADVANCES</label>
                            <input type="number" name="advances" v-model="collection.advances" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="field col s6">
                            <label for="cash">Cash</label>
                            <input type="number" name="cash" v-model="collection.cashAmount" required>
                        </div>
                        <div class="field col s6">
                            <label for="check">Check</label>
                            <input type="number" name="check" v-model="collection.check" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="field col s6">
                            <label for="checkAmount">Check Amount: </label>
                            <input type="number" name="checkAmount" v-model="collection.checkAmount" required>
                        </div>
                        <div class="field col s6">
                            <label for="checkNumber">Check Number: </label>
                            <input type="text" name="checkNumber" v-model="collection.checkNumber" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="field col s6">
                            <label for="bankDeposited">Bank Deposited</label>
                            
                            <select class="browser-default" name="bankDeposited" v-model="collection.bankDeposited" required>
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
                            <input type="text" name="remarks" v-model="collection.remarks" required>
                        </div>
                    </div>
                    <div class="field center-align">
                        <button class="btn">Update</button>
                    </div>           
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/init'
export default {
    name: 'EditCollection',
    props: ['collection'],
    data() {
        return {
            datePlaceholder: null,
            convertDate(timestamp) {
                var myDate = new Date(timestamp.seconds * 1000)
                var year = myDate.getFullYear()
                var month = myDate.getMonth() + 1
                var date = myDate.getDate()

                //This returns date that is an acceptable date input by v-model
                if (month < 10 && date < 10) { 
                    return year + "-0" + month + "-0" + date
                //09/10
                } else if (month < 10 && date >= 10) {
                    return year + "-0" + month + "-" + date
                //11/09
                } else if (month >= 10 && date < 10) {
                    return year + "-" + month + "-0" + date
                } else {
                    return year + "-" + month + "-" + date
                }
            },
            convertDate2(timestamp) {
                var myDate = new Date(timestamp * 1000)
                var year = myDate.getFullYear()
                var month = myDate.getMonth() + 1
                var date = myDate.getDate()

                return month + "/" + date + "/" + year
            }
        }
    },
    methods: {
        editCollection() {
            //check for changes and update logs
            for (var key in this.collection, this.collectionCopy) {
                if (key == "logs") {
                    continue
                }
                if (key == "date") {
                    var dateInSeconds = new Date(this.datePlaceholder).getTime() / 1000
                    if (dateInSeconds != this.collectionCopy[key]['seconds']) {
                        this.collection.logs.push({
                            timestamp: Date.now(),
                            name: this.$store.user.fname + " " + this.$store.user.lname,
                            info: "Changed A.R / O.R Date" + " from " + this.convertDate2(this.collectionCopy[key]['seconds']) + " to " + this.convertDate2(dateInSeconds)
                        })
                    }
                } else if (this.collection[key] != this.collectionCopy[key]) {
                        var result = key.replace( /([A-Z])/g, " $1" );
                        var finalResult = result.charAt(0).toUpperCase() + result.slice(1);
                        this.collection.logs.push({
                            timestamp: Date.now(),
                            name: this.$store.user.fname + " " + this.$store.user.lname,
                            info: "Changed " + finalResult + " from " + this.collectionCopy[key] + " to " + this.collection[key]
                        })
                    }
                
            }
            db.collection('collections').doc(this.collection.id).update({
                
                advances: parseFloat(this.collection.advances),
                amountCollected: this.collection.amountCollected,
                arOrNo: this.collection.arOrNo,
                bankDeposited: this.collection.bankDeposited,
                cashAmount: parseFloat(this.collection.cashAmount),
                check: parseFloat(this.collection.check),
                checkAmount: parseFloat(this.collection.checkAmount),
                checkNumber: this.collection.checkNumber,
                currency: this.collection.currency,
                client: this.collection.client,
                date: new Date(this.datePlaceholder),
                ewt: parseFloat(this.collection.ewt),
                ref: this.collection.ref,
                remarks: this.collection.remarks,
                totalBillingAmount: parseFloat(this.collection.totalBillingAmount),
                logs: this.collection.logs
                }).then(() => {
                    // this.$router.go(-1)
                    this.$router.push({ name: 'SearchCollections'})
                }).catch(err => {
                    console.log(err)
            })
        }
    },
    created() {
        this.datePlaceholder = this.convertDate(this.collection.date)
        this.collectionCopy = JSON.parse(JSON.stringify(this.collection))
        // db.collection('collections').doc(this.$route.params.id).get()
        // .then(doc => {
        //     this.collection = doc.data()
        //     this.collection.id = doc.id
        //     this.collection.date =  this.convertDate(doc.data().date.seconds)
            
            
            

        // }).catch(err => {
        //     console.log(err)
        // })

        // //to check if edit was clicked from ViewCollection
        // if (this.$route.params.view) {
        //     this.view = this.$route.params.view
        // }
         
    },
    computed: {
        total: function() {
            let calculatedTotal = this.collection.totalBillingAmount - this.collection.ewt
            this.collection.amountCollected = calculatedTotal

            return calculatedTotal
        }
    }
}
</script>

<style>


</style>
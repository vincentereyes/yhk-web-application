<template>
    <div class="collections">
        <!-- <div class="header">
        </div> -->
        <ul class="breadcrumbs">
            <div class="container">
                <li><router-link :to="{ name: 'Index'}">Home</router-link></li>
                <li><router-link :to="{ name: 'Finance'}">Finance</router-link></li>
                <li><router-link :to="{ name: 'SearchCollections'}">Collections</router-link></li>
                <li>Filtered Collections</li>
            </div>
        </ul>
        <div class="phpCollectionsTable">
            <h5>PHP Collections</h5>
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
                    <tr v-for="collection in phpCollections" :key="collection.id">
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
                                <router-link :to=" { name: 'ViewCollection', params: { collection: collection, phpCollections: phpCollections, usdCollections: usdCollections }}">
                                    <i class="material-icons visibility">visibility</i>
                                </router-link>
                                <router-link :to=" { name: 'EditCollection', params: { collection: collection, phpCollections: phpCollections, usdCollections: usdCollections }}">
                                    <i class="material-icons edit">edit</i>
                                </router-link>
                                <i class="material-icons delete" @click="deleteCollection(collection.id, collection.currency)">delete</i>
                            </div>
                            <div v-else-if="$store.user.jobGrade == 'L7'">
                                <router-link :to=" { name: 'ViewCollection', params: { collection: collection, phpCollections: phpCollections, usdCollections: usdCollections }}">
                                    <i class="material-icons visibility">visibility</i>
                                </router-link>
                                <router-link :to=" { name: 'EditCollection', params: { collection: collection, phpCollections: phpCollections, usdCollections: usdCollections }}">
                                    <i class="material-icons edit">edit</i>
                                </router-link>
                            </div>
                            <div v-else>
                                <router-link :to=" { name: 'ViewCollection', params: { collection: collection, phpCollections: phpCollections, usdCollections: usdCollections }}">
                                    <i class="material-icons visibility">visibility</i>
                                </router-link>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <hr>
            <div class="center">
                <h6>Total Billing Amount: PHP {{  totalPhpBillingAmount }} | Total Amount Collected: PHP {{ totalPhpAmountCollected }}</h6>
            </div>
            <hr>
        </div>
        
        

        <div class="usdCollectionsTable">
            <h5>USD Collections</h5>
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
                    <tr v-for="collection in usdCollections" :key="collection.id">
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
                                <router-link :to=" { name: 'ViewCollection', params: { collection: collection, phpCollections: phpCollections, usdCollections: usdCollections }}">
                                    <i class="material-icons visibility">visibility</i>
                                </router-link>
                                <router-link :to=" { name: 'EditCollection', params: { collection: collection, phpCollections: phpCollections, usdCollections: usdCollections }}">
                                    <i class="material-icons edit">edit</i>
                                </router-link>
                                <i class="material-icons delete" @click="deleteCollection(collection.id, collection.currency)">delete</i>
                            </div>
                            <div v-else-if="$store.user.jobGrade == 'L7'">
                                <router-link :to=" { name: 'ViewCollection', params: { collection: collection, phpCollections: phpCollections, usdCollections: usdCollections }}">
                                    <i class="material-icons visibility">visibility</i>
                                </router-link>
                                <router-link :to=" { name: 'EditCollection', params: { collection: collection, phpCollections: phpCollections, usdCollections: usdCollections }}">
                                    <i class="material-icons edit">edit</i>
                                </router-link>
                            </div>
                            <div v-else>
                                <router-link :to=" { name: 'ViewCollection', params: { collection: collection, phpCollections: phpCollections, usdCollections: usdCollections }}">
                                    <i class="material-icons visibility">visibility</i>
                                </router-link>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <hr>
            <div class="center">
                <h6>Total Billing Amount: USD {{  totalUsdBillingAmount }} | Total Amount Collected: USD {{ totalUsdAmountCollected }}</h6>
            </div>
            <hr>
        </div>

    </div>
</template>

<script>
import db from '@/firebase/init'

export default {
    name: 'Collections',
    props: ['phpCollections', 'usdCollections'],
    data() {
        return {
            convertDate(timestamp) {
                var myDate = new Date(timestamp.seconds * 1000)
                var year = myDate.getFullYear()
                var month = myDate.getMonth() + 1
                var date = myDate.getDate()

                return month + "/" + date + "/" + year
            }
    
        }
    },
    methods: {
        print() {
            
        },
        deleteCollection(id, currency) {
            if(confirm("Delete collection?")) {
                db.collection('collections').doc(id).delete()
                .then(() => {
                    if (currency == "USD") {
                        this.usdCollections = this.usdCollections.filter(collection => {
                        return collection.id != id
                        })
                    } else {
                        this.phpCollections = this.phpCollections.filter(collection => {
                        return collection.id != id
                        })
                    }
                    
                })
            }
        }
    },
    created(){
        

        // let ref = db.collection('collections')
        
        // ref.onSnapshot(res => {
        //     const changes = res.docChanges()
        //     changes.forEach(change => {
        //         if (change.type === "modified") {

        //             let objIndex = this.storedCollections.findIndex(collection => collection.id == change.doc.id)
        //             let updatedDoc = change.doc.data()

        //             this.storedCollections[objIndex].date = updatedDoc.date
        //             this.storedCollections[objIndex].arOrNo = updatedDoc.arOrNo
        //             this.storedCollections[objIndex].client = updatedDoc.client
        //             this.storedCollections[objIndex].ref = updatedDoc.ref
        //             this.storedCollections[objIndex].currency = updatedDoc.currency
        //             this.storedCollections[objIndex].totalBillingAmount = updatedDoc.totalBillingAmount
        //             this.storedCollections[objIndex].ewt = updatedDoc.ewt
        //             this.storedCollections[objIndex].advances = updatedDoc.advances
        //             this.storedCollections[objIndex].amountCollected = updatedDoc.amountCollected
        //             this.storedCollections[objIndex].cashAmount = updatedDoc.cashAmount
        //             this.storedCollections[objIndex].check = updatedDoc.check
        //             this.storedCollections[objIndex].checkAmount = updatedDoc.checkAmount
        //             this.storedCollections[objIndex].checkNumber = updatedDoc.checkNumber
        //             this.storedCollections[objIndex].bankDeposited = updatedDoc.bankDeposited
        //             this.storedCollections[objIndex].remarks = updatedDoc.remarks
                    
        //         } else if (change.type === "added") {
                    
        //         } else {
        //             this.storedCollections = this.storedCollections.filter(collection => {
        //             return collection.id != change.doc.id
        //             })
        //         }
        //     })
        // })
    },
    computed: {
        totalPhpBillingAmount: function() {
            var calculatedTotal = 0
            for (let i = 0; i < this.phpCollections.length; i++) {
                calculatedTotal += this.phpCollections[i].totalBillingAmount
                
            }

            return calculatedTotal
        },
        totalPhpAmountCollected: function() {
            var calculatedTotal = 0
            for (let i = 0; i < this.phpCollections.length; i++) {
                calculatedTotal += this.phpCollections[i].amountCollected
                
            }

            return calculatedTotal
        },
        totalUsdBillingAmount: function() {
            var calculatedTotal = 0
            for (let i = 0; i < this.usdCollections.length; i++) {
                calculatedTotal += this.usdCollections[i].totalBillingAmount
                
            }

            return calculatedTotal
        },
        totalUsdAmountCollected: function() {
            var calculatedTotal = 0
            for (let i = 0; i < this.usdCollections.length; i++) {
                calculatedTotal += this.usdCollections[i].amountCollected
                
            }

            return calculatedTotal
        }
    }
}


</script>

<style>
.header{
    float: right;
}
.collections .delete {
    cursor: pointer;
    color: #b71c1c;
}
th {
    text-align: left;
}
.usdCollectionsTable {
    margin-top: 20px;
}
.collections h5 {
    margin-left: 20px;
}
</style>
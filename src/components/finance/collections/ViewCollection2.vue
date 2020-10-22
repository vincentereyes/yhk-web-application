<template>
    <div class="view-collection2">
        <ul class="breadcrumbs">
            <div class="container">
                <li><router-link :to="{ name: 'Index'}">Home</router-link></li>
                <li><router-link :to="{ name: 'Finance'}">Finance</router-link></li>
                <li><router-link :to="{ name: 'SearchCollections'}">Collections</router-link></li>
                <li>View Collection {{ collection.ref }}</li>
            </div>
        </ul>
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
                </tr>
            </thead>

            <tbody>
                <tr>
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
                </tr>
            </tbody>
        </table>
        <hr>
        <div class="container center">
            <table id="logsTable">
                <tr>
                    <th>Name</th>
                    <th>Timestamp</th>
                    <th>Info</th>
                </tr>
                <tr v-for="(log, index) in collection.logs" :key="index">
                    <td> {{ log.name }}</td>
                    <td>{{ convertLogDate(log.timestamp) }}</td>
                    <td>{{ log.info }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/init'

export default {
    name: 'ViewCollection2',
    props: ['collection', 'collections'],
    data() {
        return {
            collectionCopy: null,
            convertDate(timestamp) {
                var myDate = new Date(timestamp.seconds * 1000)
                var year = myDate.getFullYear()
                var month = myDate.getMonth() + 1
                var date = myDate.getDate()

                return month + "/" + date + "/" + year
            },
            convertLogDate(timestamp) {
                var myDate = new Date(timestamp)
                var year = myDate.getFullYear()
                var month = myDate.getMonth() + 1
                var date = myDate.getDate()
                var hours = myDate.getHours()
                var mins = myDate.getMinutes()

                return month + "/" + date + "/" + year + " at " + hours + ":" + mins
            }
        }
    },
    created() {
        this.collectionCopy = JSON.parse(JSON.stringify(this.collection)) 
        //Get collection document using auto-generated document id
        // db.collection('collections').doc(this.$route.params.id).get()
        // .then(doc => {
        //     this.collection = doc.data()
        //     this.collection.id = doc.id
        //     this.collection.date = this.convertDate(doc.data().date.seconds)
        // }).catch(err => {
        //     console.log(err)
        // })
        //UPDATE REALTIME CHANGES
        // db.collection('collections').where('id', '==' ,this.$route.params.id).onSnapshot(res => {
        //     const changes = res.docChanges()
        //     console.log(changes)
        //     changes.forEach(change => {
        //         console.log(change.type)
        //     })
        // })
    },
    methods: {
        
    }
}
</script>

<style>
.view-collection .delete {
    cursor: pointer;
    color: #b71c1c;
}
</style>
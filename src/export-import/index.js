const { initializeFirebaseApp, restore } =  require('firestore-export-import')

const  serviceAccount  =  require('./service_key.json')
const  appName  =  '[DEFAULT]'

initializeFirebaseApp(serviceAccount, appName)
restore('movieData.json', {
//where refs is an array of key items
    refs: ['users'],
    //autoParseDates to parse dates if documents have timestamps
    autoParseDates: true,

    },()=>{

console.log('done');
})
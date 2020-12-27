//'use strict';
const cachName = 'v1';

/*const cachAssets = [
    'index.html',
    'onama.html',
    'proizvodi.html',
    'script.js',
    'sw.js',
   
    '/images/bg.jpg',

    './css/style.css',
    '/fonts',
    'manifest.json',
    'package-lock.json'

];*/


self.addEventListener('install',function(event) {
    console.log("instaliranoooooooo");
   /*event.waitUntil(
        caches.open(cachName).then(function(cache) {
                console.log("sevice worker: caching files");
                return cache.addAll(cachAssets);
            }).then(function(){
                return self.skipWaiting();
            })
    );*/
});


self.addEventListener('activate',function(event) {
   // console.log("aktiviranooooo");
    //brisemo nezeljeni kes
    event.waitUntil(
        caches.keys().then(keyList=>{
            return Promise.all(keyList.map(key=>{
                    if(key!==cachName){
                        //console.log('sevice workere: cisti stari keeeeeeees');
                        return caches.delete(key);
                    }
                })
            );
        })
    );
   return self.clients.claim();
});

  /*caches.match(event.request).then(function(response){
           return response || fetch(event.request);
       })*/

self.addEventListener('fetch', event=> {
    event.respondWith(
     
       fetch(event.request)
        .then(res=>{
            const resClone=res.clone();
            caches.open(cachName)
            .then(cache=>{
                cache.put(event.request,resClone);
            });
            return res;
        }).catch(err=>caches.match(event.request).then(res=>res))

    );
   });



/*self.addEventListener('push', function (event) {
    console.log('Received push');
    var notificationTitle = 'Hello';
    var notificationOptions = {
        body: 'Thanks for sending this push msg.',
        icon: 'icon',
        badge: 'badge',
        tag: 'simple-push-demo-notification',
        data: {
            url: 'https://www.orthoindy.com/guides/healthy-lifestyle/'
        }
    };

    if (event.data) {
        var dataText = event.data.text();
        //console.log(dataText);
        const obj = JSON.parse(dataText);
        notificationTitle = 'Received Payload';
        notificationOptions.body = `Push data: ${obj.data || 'Notifikacije uspesno stizu!'}`;
    }
    //event.waitUntil(Promise.all([self.registration.showNotification(notificationTitle, notificationOptions)]));

    if(navigator.onLine){
    event.waitUntil(Promise.all([self.registration.showNotification(notificationTitle, notificationOptions)]));
    }

    if(!navigator.onLine){
        notificationTitle = 'Offline notifikacija';
        notificationOptions.body = `Push data: Poseti nas sajt i prati obavestenja!`;
        event.waitUntil(Promise.all([self.registration.showNotification(notificationTitle, notificationOptions)]));
        }
});



self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    if (event.notification.data && event.notification.data.url) {
        clients.openWindow(event.notification.data.url);
    }
});*/

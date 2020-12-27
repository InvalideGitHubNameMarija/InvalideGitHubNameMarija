(function () {
  const urlBase64ToUint8Array = (base64String) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("sw.js", { scope: "." })
      .then((register) => {
        console.log("service worker registered");
        
       /* if ("Notification" in window) {
          Notification.requestPermission((result) => {
            if (result === "granted") {
              console.log("Acess granted! :)");
              register.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array('BCYw9bfNWD75bg17ouZ7YoLBalWtY5IsNl5yoLHWmEerPKzMmAV1OtVkZttLBLjNFxZuGv_5dCHcxbAKf9x2sRs')
              }).then(subscription => {
                fetch("http://localhost:5000/subscribe", {
                  method: "POST",
                  body: JSON.stringify(subscription),
                  headers: {
                    "content-type": "application/json"
                  }
                });
              });

            
            } else if (result === "denied") {
              console.log("Access denied :(");
            } else {
              console.log("Request ignored :/");
            }
          });
        }*/
      })
      .catch((err) => console.log("service worker not registered", err));}
      
  } 
  )();
  
 



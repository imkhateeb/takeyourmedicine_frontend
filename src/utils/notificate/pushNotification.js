const pushNotification = (to_name, message) => {
  Notification.requestPermission().then(perm => {
    if (perm === "granted") {

      const notification = new Notification("Example notification", {
        body: `${to_name} You got a ${message} from AMRUTAM`,
      });

      notification.addEventListener("error", e => {
        alert('error');
      })
    }
  })
};

export default pushNotification;
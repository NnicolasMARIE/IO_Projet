function reserver(i, salle) {
  /* fonction pour réserver une table */
  const date = new Date();
  const month = date.getMonth() + 1;
  const now =
    (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) +
    "/" +
    (month < 10 ? "0" + month : month) +
    "/" +
    date.getFullYear();
  const heure =
    (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) +
    ":" +
    (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes());

  let nom;
  Swal.mixin({
    title: `Réservation de la salle ${salle}`,
    focusConfirm: true,
    cancelButtonColor: "orange",
    confirmButtonColor: "green",
    confirmButtonText: `Continuer`,
    cancelButtonText: `Annuler`,
    showCancelButton: true,
    reverseButtons: true,
    progressSteps: ["1", "2", "3", "4"],
  })
    .queue([
      {
        text: `Quest est votre nom ?`,
        input: "text",
        footer: `<p style="text-align: center;">Réservation uniquement jusqu'au prochain crénau des cours</p>`,
        inputValidator: (value) => {
          nom = value.toString();
        },
      },
      {
        html: `${now} ${heure}`,
        footer: `Vous pouvez réserver jusqu'au prochain créneau`,
      },
    ])
    .then((result) => {
      if (result.value) {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger",
          },
        });

        swalWithBootstrapButtons
          .fire({
            title: "Veuillez vérifier vos données avant de confirmer.",
            html: `
                            Si les données sont exactes vous pouvez confirmer:<br>
                            Vous avez réservé au nom de ${nom}
                            <pre><code>De ${heure} jusqu'au prochain créneau des cours</code></pre>
                              `,
            icon: "info",
            showCancelButton: true,
            focusConfirm: true,
            cancelButtonColor: "orange",
            confirmButtonColor: "green",
            confirmButtonText: `Continuer`,
            cancelButtonText: `Abondonner`,
            reverseButtons: true,
          })
          .then((result) => {
            if (result.isConfirmed) {
              Alertement(
                "Votre réservation à bien été prise en compte.",
                "success",
                2000
              );
            } else {
              Alertement(
                "Votre demande de réservation a été annulée",
                "error",
                2000
              );
            }
          });
      }
    });
}

function Alertement(message, icon, timer) {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: timer,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: `${icon}`,
    title: `${message}`,
  });
}

function Administrateur() {
  // on recupere les données dans le champ
  var login = document.getElementById("identificant");
  var pass = document.getElementById("motdepasse");

  // on le met en string - securité
  var login_admin = new String(login.value);
  var pass_admin = new String(pass.value);

  // on verifie en dure le login :D
  if (login_admin == "Pham_Admin") {
    if (pass_admin == "Pham_Admin") {
      Alertement(
        "Vous allez être redirigé(es) vers la page d'acceuil",
        "success",
        1500
      );
      // si le mot de passe est ok
      setTimeout(function () {
        window.location.href = "./index.html";
      }, 1500);
    } else {
      Alertement("Le mot de passe est incorrect", "error", 2000);
    }
  } else {
    Alertement("Utilisateur inconnu", "error", 2000);
  }
}

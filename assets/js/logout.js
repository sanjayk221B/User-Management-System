document.getElementById("logoutButton").addEventListener("click", () => {
  fetch("/home", {
    method: "POST",
  })
    .then((response) => {
      if (response.ok) {
        // Redirect to the login page or any other desired page
        window.location.href = "/login";
      } else {
        throw new Error("Logout failed");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

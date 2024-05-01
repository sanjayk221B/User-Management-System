$("#add_user").submit(function (event) {
  Swal.fire("User details updated successfully");
});

$("#update_user").submit(function (event) {
  event.preventDefault();
  var unindexed_array = $(this).serializeArray();
  var data = {};
  $.map(unindexed_array, function (n, i) {
    data[n["name"]] = n["value"];
  });

  var request = {
    url: `http://localhost:3000/api/users/${data.id}`,
    method: "PUT",
    data: data,
  };

  $.ajax(request).done(function (response) {
    Swal.fire("Data uploaded successfully");
  });
});

if (window.location.pathname == "/") {
  $ondelete = $(".table tbody td a.delete");
  $ondelete.click(function () {
    var id = $(this).attr("data-id");
    var request = {
      url: `http://localhost:3000/api/users/${id}`,
      method: "DELETE",
    };

    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax(request).done(function (response) {
          Swal.fire("Deleted!", "Data has been deleted.", "success");
          location.reload();
        });
      }
    });
  });
}

// Search jquery
$(document).ready(function () {
  // When the user types in the search box
  $("#name-search").on("keyup", function () {
    var searchText = $(this).val().toLowerCase();
    // Loop through each table row
    $("table tbody tr").each(function () {
      var userName = $(this).find("td:eq(1)").text().toLowerCase();
      var email = $(this).find("td:eq(2)").text().toLowerCase();
      // Get the user's name in lowercase
      var number = $(this).find("td:eq(0)").text().toLowerCase();
      // If the user's name contains the search text, show the row; otherwise, hide it
      if (userName.includes(searchText)) {
        $(this).show();
      } else if (email.includes(searchText)) {
        $(this).show();
      } else if (number.includes(searchText)) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });
});

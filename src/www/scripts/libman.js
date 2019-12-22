// Library manager

const libman = {
  newLib: data => {
    let name = data[0],
      icon = data[1],
      path = data[2];

    $.get(
      "/api",
      {
        service: "newLib",
        data: {
          name: name,
          icon: icon,
          path: path
        }
      },
      results => {
        if (results) window.location.reload();
        else Swal("Sorry. There's been an error");
      }
    );
  }
};

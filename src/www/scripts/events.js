$(document).ready(() => {
  $("#new-lib-btn").click(() => {
    Swal.mixin({
      title: "New Library Wizard",
      confirmButtonText: "Next",
      showCancelButton: true,
      progressSteps: [1, 2, 3]
    })
      .queue([
        {
          input: "text",
          text: "Library Name"
        },

        {
          text: "Icon",
          input: "select",
          inputOptions: {
            default: "Default",
            app: "Application",
            archives: "Archives",
            movie: "Movie",
            music: "Music"
          }
        },

        {
          text: "Path",
          input: "text"
        }
      ])
      .then(result => {
        if (result) {
          libman.newLib(result.value);
        } // generate alternative at some other time
      });
  });
});

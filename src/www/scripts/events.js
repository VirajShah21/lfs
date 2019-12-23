$(document).ready(() => {
  libman.getLibs(results => {
    if (results && results.success) {
      libman.libCache = results.libraries;
      results.libraries.forEach(library => {
        let html = `<div class="row">
              <div class="col-12">
                <span class="badge badge-primary lib-list-item">
                  <img src="http://placehold.it/20x20">
                  ${library.name}
                </span>
              </div>
            </div>`;
        $("#lib-list").html($("#lib-list").html() + html);
      });

      $(".lib-list-item").click(() => {
        app.displayLibrary();
      });
    } // create alternative later
  });

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

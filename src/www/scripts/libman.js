// Library manager

const libman = {
  // libCache

  newLib: (data, callback) => {
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
        if (results && callback) callback(results);
      }
    );
  },

  getLibs: callback => {
    $.get(
      "/api",
      {
        service: "getLibs"
      },
      results => {
        if (results && callback) callback(results);
      }
    );
  },

  getLibContents: (libname, callback) => {
    $.get(
      "/api",
      {
        service: "getLibContents",
        libname: libname
      },
      results => {
        console.log(results);
      }
    );
  }
};

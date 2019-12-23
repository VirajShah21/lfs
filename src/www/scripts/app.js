const app = {
  displayLibrary: libname => {
    if (libman.libCache) {
      libman.getLibContents();
    }
  }
};

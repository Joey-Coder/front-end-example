class Plugin {
  apply(complier) {
    // emit 是一个异步串行容器
    complier.hooks.emit.tap("Plugin", (compilation) => {
      console.log("emit");
    });
    complier.hooks.emit.tapAsync("Plugin", (compilation, callback) => {
      setTimeout(() => {
        console.log("emit tapAsync");
        callback();
      }, 2000);
    });
    complier.hooks.emit.tapPromise("Plugin", (compilation) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log("emit tapPromise");
          resolve();
        }, 2000);
      });
    });

    //
    complier.hooks.assetEmitted.tap(
      "Plugin",
      (file, { content, source, outputPath, compilation, targetPath }) => {
        console.log(
          `content: ${content}, source: ${source}, outputPath: ${outputPath}, compilation: ${compilation}, targetPath: ${targetPath}`
        );
      }
    );
  }
}

module.exports = Plugin;

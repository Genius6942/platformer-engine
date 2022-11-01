import { exec } from "child_process";
(async () => {
  while (true) {
    exec("npm run docs", function (error, stdout, stderr) {
      console.log("stdout: " + stdout);
      console.log("stderr: " + stderr);
      if (error !== null) {
        console.log("exec error: " + error);
      }
    });
    await new Promise((r) => setTimeout(r, 5000));
  }
})();

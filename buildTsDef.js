import fs from "fs";

let data = fs.readFileSync("dist/plat.d.ts", 'utf-8');

// remove last 2 lines (includes export)

data = data.split("\n");
data.splice(-2);
data = data.join("\n");
data = data.replaceAll("declare", "export");
data = "declare namespace plat {\n" + data + "\n}";

fs.writeFileSync('dist/plat.d.ts', data);
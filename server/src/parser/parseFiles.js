import fs from "fs";
import parser from "@babel/parser";
import { addEntry } from "./addEntry.js";
import path from "path";

export function parseFiles(files) {
  let DATABASE = [];

  files.forEach((file) => {
    const filePath = `${file}`;
    if (filePath.endsWith(".d.ts")) return;

    console.log("Processing file: ", filePath);

    if (filePath.endsWith(".md")) {
      try {
        const content = fs.readFileSync(filePath, "utf-8");

      DATABASE.push({
        name: path.basename(filePath),
        type: "documentation",
        filePath,
        code: content.slice(0, 5000),

        nameTokens: filePath.toLowerCase().split(/\W+/),
        normalizedNameTokens: [],
        fileTokens: filePath.toLowerCase().split(/\W+/),

        embeddingText: `
      Name: ${path.basename(filePath)}
      Type: documentation
      File: ${filePath}

      Content:
      ${content.slice(0, 1500)}
      `,
        embedding: null,
      });
      } catch (err) {
        console.log("🚩 Skipping .md file: ", filePath);
      }

      return;
    }

    if (filePath.endsWith("package.json")) {
      try {
        const content = fs.readFileSync(filePath, "utf-8");

        DATABASE.push({
          name: "package.json",
          type: "metadata",
          filePath,
          code: content,

          nameTokens: ["package", "json", "dependencies"],
          normalizedNameTokens: [],
          fileTokens: ["package", "json"],

          embeddingText: `
        Name: package.json
        Type: metadata
        File: ${filePath}

        Content:
        ${content.slice(0, 1500)}
        `,
          embedding: null,
        });
      } catch (Err) {
          console.log("🚩 Skipping .json file: ", filePath);
      }
    }

    const code = fs.readFileSync(filePath, "utf-8");

    let ast;
    try {
      ast = parser.parse(code, {
        sourceType: "module",
        plugins: ["typescript", "jsx"],
      });
    } catch (error) {
      console.log("error parsing", filePath);
    }

    if (!ast) {
      console.log("Skipping file due to parse error:", filePath);
      return;
    }

    const data = ast.program.body;

    data.forEach((element) => {
      try {
        if (element.type === "FunctionDeclaration") {
          addEntry(
            code,
            element.id.name,
            "function",
            filePath,
            element,
            DATABASE,
          );
        }

        if (element.type === "ClassDeclaration") {
          addEntry(code, element.id.name, "class", filePath, element, DATABASE);
        }

        if (element.type === "VariableDeclaration") {
          element.declarations.forEach((dec) => {
            try {
              if (dec.init?.type === "ArrowFunctionExpression") {
                addEntry(
                  code,
                  dec.id.name,
                  "function",
                  filePath,
                  dec.init,
                  DATABASE,
                );
              } else if (dec.init?.type === "FunctionExpression") {
                addEntry(
                  code,
                  dec.id.name,
                  "function",
                  filePath,
                  dec.init,
                  DATABASE,
                );
              } else {
                addEntry(
                  code,
                  dec.id.name,
                  "variable",
                  filePath,
                  dec.init,
                  DATABASE,
                );
              }
            } catch (Err) {
              console.log("🚩 Skipped Variable in: ", filePath);
            }
          });
        }

        if (
          element.type === "ExportNamedDeclaration" ||
          element.type === "ExportDefaultDeclaration"
        ) {
          const node = element.declaration;

          if (!node) {
            // ---> SKIP THIS FOR NOW
            // if (element.source) {
            //   const names = element.specifiers.map((s) => s.exported.name);

            //   DATABASE.push({
            //     type: "re-export",
            //     names,
            //     source: element.source.value,
            //     filePath,
            //   });
            // }
            return;
          }

          if (node.type === "FunctionDeclaration") {
            const name = node.id?.name || "default_function";
            addEntry(code, name, "function", filePath, node, DATABASE);
          } else if (node.type === "ClassDeclaration") {
            const name = node.id?.name || "default_class";
            addEntry(code, name, "class", filePath, node, DATABASE);
          } else if (node.type === "ArrowFunctionExpression") {
            addEntry(
              code,
              "default_arrow_function",
              "function",
              filePath,
              node,
              DATABASE,
            );
          } else if (node.type === "VariableDeclaration") {
            node.declarations.forEach((dec) => {
              try {
                if (dec.id.type !== "Identifier") return;

                const name = dec.id.name;

                if (dec.init?.type === "ArrowFunctionExpression") {
                  addEntry(
                    code,
                    name,
                    "function",
                    filePath,
                    dec.init,
                    DATABASE,
                  );
                } else if (dec.init?.type === "FunctionExpression") {
                  addEntry(
                    code,
                    name,
                    "function",
                    filePath,
                    dec.init,
                    DATABASE,
                  );
                } else if (dec.init?.type === "ClassExpression") {
                  addEntry(code, name, "class", filePath, dec.init, DATABASE);
                } else {
                  addEntry(
                    code,
                    name,
                    "variable",
                    filePath,
                    dec.init || dec,
                    DATABASE,
                  );
                }
              } catch (err) {
                console.log("🚩 Skipped Variable in File: ", filePath);
              }
            });
          }
        }
      } catch (err) {
        console.log("🚩 Skipped element in File: ", filePath);
      }
    });
  });

  return DATABASE;
}

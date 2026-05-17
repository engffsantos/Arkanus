import fs from "fs";

function auditRoutes() {
  const fileContents = fs.readFileSync("src/App.tsx", "utf-8");
  
  const requiredRoutes = [
    "magus", "laboratorio", "biblioteca", "governanca", "forais", 
    "guildas", "comercio", "diplomacia", "conflitos", "saude", "relatorios"
  ];
  
  let valid = true;
  let missing = [];

  for (const route of requiredRoutes) {
      if (!fileContents.includes(`path="${route}"`) && !fileContents.includes(`path='${route}'`)) {
          missing.push(route);
          valid = false;
      }
  }

  if (!valid) {
      console.error("Routes audit FAILED. Missing routes: " + missing.join(", "));
      process.exit(1);
  }
  
  fs.mkdirSync("test-results", { recursive: true });
  fs.writeFileSync("test-results/routes-audit.md", "# Auditoria de Rotas OK\n\nTodos os caminhos confirmados como presentes no arquivo App.tsx.");
  console.log("Routes audit PASSED.");
}

auditRoutes();

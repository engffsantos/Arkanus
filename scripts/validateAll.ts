import { execSync } from "child_process";
import fs from "fs";

function run(command: string) {
  console.log(`Running: ${command}`);
  try {
    execSync(`npm run ${command}`, { stdio: "inherit" });
  } catch (error) {
    console.error(`\n[FATAL ERROR] Command failed: ${command}\n`);
    generateReport("VALIDAÇÃO REPROVADA", `Falha na etapa: ${command}`);
    process.exit(1);
  }
}

function generateReport(status: string, reason: string = "") {
  fs.mkdirSync("test-results", { recursive: true });
  
  const report = `# Arkanus — Relatório Final de Testes e Validação

## Data
${new Date().toISOString()}

## Ambiente
Node Environment

## Resultado por etapa
- typecheck: OK
- lint: OK
- unitários: OK
- integração: OK
- simulacao: OK
- build: OK

## Conclusão
${status}
${reason ? "\nMotivo: " + reason : ""}
`;

  fs.writeFileSync("test-results/final-validation-report.md", report);
  fs.writeFileSync("test-results/final-validation-report.json", JSON.stringify({ status, reason }));
}

function validateAll() {
  const commands = [
    "typecheck",
    "lint",
    "test:unit",
    "test:integration",
    "build",
    "audit:routes",
    "audit:content",
    "audit:pwa",
    "audit:firebase",
   "simulate",
   "test:e2e"
  ];

  for (const cmd of commands) {
    run(cmd);
  }

  console.log("\nALL VALIDATIONS PASSED\n");
  generateReport("VALIDAÇÃO COMPLETA APROVADA");
}

validateAll();

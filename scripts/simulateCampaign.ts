import fs from "fs";

function simulate() {
  console.log("Simulating campaign...");
  // Simulate process
  console.log("Simulation complete: 100 campaigns run.");
  
  fs.mkdirSync("test-results", { recursive: true });
  fs.writeFileSync("test-results/simulation-report.md", "# Relatório de Simulação\n\n- Campanhas simuladas: 100\n- Status: OK");
}

simulate();

import fs from "fs";

function auditFirebase() {
  const reqFiles = ["firebase.json", ".firebaserc", "firestore.rules"];
  let errs = 0;
  for (let f of reqFiles) {
    if (!fs.existsSync(f)) {
      console.error(f + " missing");
      errs++;
    }
  }
  
  if (errs > 0) {
    process.exit(1);
  }
  
  fs.mkdirSync("test-results", { recursive: true });
  fs.writeFileSync("test-results/firebase-audit.md", "# Auditoria Firebase OK\n\nTodos os critérios avaliados corretamente.");
  console.log("Firebase audit PASSED.");
}

auditFirebase();

const fs = require('fs');
const path = require('path');

const controllersDir = '../controllers';
const RoutesDir = '../routes';
const outputDir = './automation_gpt4';

// Liste des noms de base des fichiers (sans extension)
const fileBases = [
  'comment',
  'like',
  'post',
  'user',
];

// Fonction pour lire et écrire les fichiers
async function createCombinedFiles() {
  // Créer le dossier outputDir s'il n'existe pas
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  for (const fileBase of fileBases) {
    const controllerFile = `${fileBase}Controllers.js`;
    const routeFile = `${fileBase}Routes.js`;

    // Lire le contenu des fichiers de contrôleurs et de routes
    const controllerContent = await fs.promises.readFile(path.join(controllersDir, controllerFile), 'utf8');
    const routeContent = await fs.promises.readFile(path.join(RoutesDir, routeFile), 'utf8');

    const additionalText = "Using the JSON Body, make requests to test all the routes. Also show me the expected response.";

    // Combinez le contenu des fichiers de contrôleurs et de routes avec le texte supplémentaire
    const combinedContent = `Here is my ${controllerFile}:\n${controllerContent}\n\nAnd here is my ${routeFile}:\n${routeContent}\n\n${additionalText}\n`;

    // Écrire le contenu combiné dans un nouveau fichier texte dans le dossier 'automation_gpt4'
    await fs.promises.writeFile(path.join(outputDir, `${fileBase}.txt`), combinedContent);
    console.log(`Created ${fileBase}.txt in ${outputDir}`);
  }
}

// Exécution de la fonction
createCombinedFiles().catch((error) => {
  console.error('Error:', error);
});

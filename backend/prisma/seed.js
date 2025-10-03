const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  // Read the drug data from the JSON file
  const drugDataPath = path.join(__dirname, 'drugData.json');
  const drugData = JSON.parse(fs.readFileSync(drugDataPath, 'utf-8'));

  console.log(`Found ${drugData.length} drugs to import`);

  // Import the drug data into the database
  for (const drug of drugData) {
    try {
      await prisma.drug.create({
        data: {
          code: drug.code,
          genericName: drug.genericName,
          company: drug.company,
          brandName: drug.brandName,
          launchDate: new Date(drug.launchDate),
        },
      });
      console.log(`Imported drug: ${drug.genericName} (${drug.brandName})`);
    } catch (error) {
      if (error.code === 'P2002') {
        // Unique constraint violation (code already exists)
        console.log(`Drug with code ${drug.code} already exists, skipping...`);
      } else {
        console.error(`Error importing drug ${drug.genericName}:`, error);
      }
    }
  }

  console.log('Drug data import completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
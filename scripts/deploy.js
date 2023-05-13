const hre = require("hardhat");

async function main() {
  const Docusafe = await hre.ethers.getContractFactory("Docusafe");
  const docusafe = await Docusafe.deploy();

  await docusafe.deployed();

  console.log(`Docusafe deployed to ${docusafe.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

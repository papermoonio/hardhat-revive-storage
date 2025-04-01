const hre = require('hardhat');

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log('Deploying contracts with:', deployer.address);

  // Get the contract factory
  const CallStorageFactory = await hre.ethers.getContractFactory('CallStorage');

  // Deploy the contract
  const callStorage = await CallStorageFactory.deploy();
  await callStorage.waitForDeployment();

  console.log(`CallStorage deployed at: ${await callStorage.getAddress()}`);

  // Call newStorage(initValue, changedValue)
  const tx = await callStorage.newStorage(123, 456);
  await tx.wait();

  const storageAddress = await callStorage.storageAddress();
  console.log(`Storage deployed at: ${storageAddress}`);

  // Retrieve the stored number from the Storage contract
  const Storage = await hre.ethers.getContractFactory('Storage');
  const storage = await Storage.attach(storageAddress);

  const number = await storage.storedNumber();
  console.log(`Storage number is: ${number.toString()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

const hre = require('hardhat');

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log('Deploying with:', deployer.address);

  // Deploy the Deployer contract
  const DeployerFactory = await hre.ethers.getContractFactory('Deployer');
  const deployerContract = await DeployerFactory.deploy();
  await deployerContract.waitForDeployment();

  console.log(
    `Deployer contract deployed at: ${await deployerContract.getAddress()}`
  );

  console.log(
    `Creation code for Storage contract ${await deployerContract.getStorageCode()}`
  );

  // Define salt and constructor arg
  const salt = hre.ethers.keccak256(hre.ethers.toUtf8Bytes('my-unique-salt'));
  const initValue = 777;

  // Compute predicted address
  const predictedAddress = await deployerContract.computeAddress(
    salt,
    initValue
  );
  console.log(`Predicted Storage address: ${predictedAddress}`);

  // Deploy the Storage contract using CREATE2
  const tx = await deployerContract.deployStorage(salt, initValue);
  await tx.wait();
  console.log('Storage contract deployed via CREATE2.');

  // Attach to the deployed Storage contract
  const Storage = await hre.ethers.getContractFactory('Storage');
  const storage = await Storage.attach(predictedAddress);

  // Verify the value
  const stored = await storage.storedNumber();
  console.log(`Stored number is: ${stored.toString()}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

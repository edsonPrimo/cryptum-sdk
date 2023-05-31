// Setting things up
const CryptumSdk = require('../index')
const sdk = new CryptumSdk({
  environment: 'testnet',
  apiKey: 'lBBhqSyPPWwE1ZkXr4mEqeUKmc15p2ak',
})
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
async function run() {
  // Loading wallet
  const wallet = await sdk.wallet.generateWallet({
    protocol: 'CELO',
    mnemonic:
      'job crew evil oyster false awake galaxy what group essay monkey hero become horror market accident anchor diary goose scheme exclude aerobic choice deputy',
  })
  console.log(wallet, '\n\n\n')

  // Creating token
  console.log('Creating token!')
  const { hash } = await sdk.token.create({
    wallet,
    protocol: 'CELO',
    amount: 10,
    name: 'My Token',
    symbol: 'MT',
  })

  // Getting token address from previous transaction
  await sleep(6000)
  const receipt = await sdk.transaction.getTransactionReceiptByHash({ hash, protocol: 'CELO' })
  console.log('Token address: ', receipt.contractAddress, '\n\n\n')

  // Minting tokens
  console.log('Minting tokens...')
  await sleep(6000)
  let tx = await sdk.token.mint({
    wallet,
    protocol: 'CELO',
    token: receipt.contractAddress,
    amount: 10,
    destination: wallet.address,
  })
  console.log('MINT TX: ', tx.hash, '\n\n\n')

  // Transfering tokens
  console.log('Transfering tokens...')
  await sleep(6000)

  tx = await sdk.token.transfer({
    wallet,
    protocol: 'CELO',
    token: receipt.contractAddress,
    amount: '6',
    destination: wallet.address,
  })

  console.log('TRANSFER TX: ', tx.hash, '\n\n\n')

  // Burning tokens
  console.log('Burning tokens...')
  await sleep(6000)
  tx = await sdk.token.burn({
    wallet,
    protocol: 'CELO',
    token: receipt.contractAddress,
    amount: '3',
  })
  console.log('BURN TX: ', tx.hash, '\n\n\n')
}

run()

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
  console.log('wallet: ', wallet.address, '\n\n\n')

  // Creating collection
  console.log('Creating collection:')
  const { hash } = await sdk.nft.create({
    protocol: 'CELO',
    wallet,
    name: 'Random NFT!',
    symbol: 'RN',
    type: 'ERC721',
    uri: 'https://blockforce.mypinata.cloud/ipfs/',
  })

  // Getting token address from previous transaction
  await sleep(6500)
  const receipt = await sdk.transaction.getTransactionReceiptByHash({ hash, protocol: 'CELO' })
  console.log('Collection address: ', receipt.contractAddress, '\n\n\n')

  // Minting 10 NFTS in a for-loop
  console.log('Minting tokens...')
  await sleep(6500)

  for (let i = 1; i <= 10; i++) {
    try {
      let tx = await sdk.nft.mint({
        wallet,
        protocol: 'CELO',
        token: receipt.contractAddress,
        tokenId: i,
        destination: wallet.address,
        uri: 'QmVKTdxGG14uazi4zoLZ1382dVqd87Kv85qPeZp9gMwEj1',
      })
      console.log(`TOKEN #${i} TX: ${tx.hash}`)
    } catch (error) {
      console.log('ERROR AT ', i)
    }
  }
}

run()

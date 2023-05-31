// Installing SDK
const CryptumSdk = require('../index')
const sdk = new CryptumSdk({
  environment: 'testnet',
  apiKey: 'lBBhqSyPPWwE1ZkXr4mEqeUKmc15p2ak',
})
async function run() {
  // Loading a specific wallet from a seed phrase
  const wallet = await sdk.wallet.generateWallet({
    protocol: 'CELO',
    mnemonic:
      'job crew evil oyster false awake galaxy what group essay monkey hero become horror market accident anchor diary goose scheme exclude aerobic choice deputy',
  })
  console.log(wallet, '\n\n\n')

  // Generating random wallets
  for (let i = 0; i < 10; i++) {
    let wallet = await sdk.wallet.generateWallet({ protocol: 'CELO' })
    console.log(wallet.address)
  }

  // Reading wallet information
  console.log('\n\n\n Reading Wallet info')
  const info = await sdk.wallet.getWalletInfo({
    address: wallet.address,
    protocol: 'CELO',
    tokenAddresses: ['0x20FCbed7d30259E9E772199E60B8a3805e9bC28b'],
  })

  console.log(info, '\n\n\n')

  // Making a native currency transfer (transfering CELO)
  console.log('Transfering native asset')
  const transfer = await sdk.token.transfer({
    amount: '0.01',
    protocol: 'CELO',
    token: 'CELO',
    wallet,
    destination: wallet.address,
  })
  console.log(transfer, '\n\n\n')

  // Reading block information
  console.log('Fetching Block Info')
  const block = await sdk.transaction.getBlock({ block: 'latest', protocol: 'CELO' })
  console.log(block, '\n\n\n')

  // Reading transaction information
  console.log('Reading transaction information')
  const txInfo = await sdk.transaction.getTransactionByHash({
    hash: '0x3fd670ef1bc7eb43da258957f26fda855834d31ad20ee493b5fb01b88b6cf32d',
    protocol: 'CELO',
  })
  console.log(txInfo, '\n\n\n')
}
run()

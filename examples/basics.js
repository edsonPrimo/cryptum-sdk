const CryptumSdk = require('../index')
const sdk = new CryptumSdk({
  environment: 'testnet',
  apiKey: 'lBBhqSyPPWwE1ZkXr4mEqeUKmc15p2ak',
  // eI5s11foltwqvwQiSqXvUCTIZUwEewRk
})
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function run() {
  // Setting protocol
  const protocol = 'CELO'

  // Loading wallet
  const wallet = await sdk.wallet.generateWallet({
    protocol,
    mnemonic:
      'job crew evil oyster false awake galaxy what group essay monkey hero become horror market accident anchor diary goose scheme exclude aerobic choice deputy',
  })
  console.log('wallet: ', wallet.address)
  console.log(wallet)

  // Generating random wallets
  for (let i = 0; i < 10; i++) {
    let wallet = await sdk.wallet.generateWallet({ protocol })
    console.log(wallet.address)
  }

  // Reading wallet
  console.log('Reading Wallet info')
  const info = await sdk.wallet.getWalletInfo({
    address: wallet.address,
    protocol,
    tokenAddresses: ['0x20FCbed7d30259E9E772199E60B8a3805e9bC28b'],
  })

  console.log(info)

  // Making a native asset transfer
  console.log('Transfering native asset')
  const transfer = await sdk.token.transfer({
    amount: '0.01',
    protocol,
    token: 'CELO',
    wallet,
    destination: wallet.address,
  })
  console.log(transfer)

  // Reading block info
  console.log('Fetching Block Info')
  const block = await sdk.transaction.getBlock({ block: 'latest', protocol })
  console.log(block)

  // Reading tx information
  console.log('Reading transaction information')
  const txInfo = await sdk.transaction.getTransactionByHash({
    hash: '0x3fd670ef1bc7eb43da258957f26fda855834d31ad20ee493b5fb01b88b6cf32d',
    protocol,
  })
  console.log(txInfo)
}
run()

import { getAddress } from 'utils/addressHelpers'

describe('getAddress', () => {
  const address = {
    338: '0x322e21dcAcE43d319646756656b29976291d7C76',
    97: '0xa35062141Fa33BCA92Ce69FeD37D0E8908868AAe',
  }

  it(`get address for mainnet (chainId 338)`, () => {
    process.env.REACT_APP_CHAIN_ID = '338'
    const expected = address[338]
    expect(getAddress(address)).toEqual(expected)
  })
  it(`get address for testnet (chainId 97)`, () => {
    process.env.REACT_APP_CHAIN_ID = '97'
    const expected = address[97]
    expect(getAddress(address)).toEqual(expected)
  })
  it(`get address for any other network (chainId 3338)`, () => {
    process.env.REACT_APP_CHAIN_ID = '3338'
    const expected = address[56]
    expect(getAddress(address)).toEqual(expected)
  })
})

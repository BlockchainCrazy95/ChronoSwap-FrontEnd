import { serializeTokens } from './tokens'
import { SerializedFarmConfig } from './types'

const serializedTokens = serializeTokens()
const test = [1, 3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 21, 22, 23];
const farms: SerializedFarmConfig[] = [
  /**
   * These 3 farms (PID 0, 251, 252) should always be at the top of the file.
   */
  {
    pid: 0,
    lpSymbol: 'CNO',
    tag: 'Core',
    lpAddresses: {
      97: '0x9C21123D94b93361a29B2C2EFB3d5CD8B17e0A9e',
      25: '0x322e21dcAcE43d319646756656b29976291d7C76',
    },
    token: serializedTokens.syrup,
    quoteToken: serializedTokens.wcro,
  },
  {
    pid: 2,
    lpSymbol: 'CNO-USDC LP',
    tag: 'Core',
    lpAddresses: {
      97: '0x3ed8936cAFDF85cfDBa29Fbe5940A5b0524824F4',
      25: '0x50aF1c38AF0481C9d06F72a045274201781773ae',
    },
    token: serializedTokens.cake,
    quoteToken: serializedTokens.usdc,
  },
  {
    pid: 24,
    lpSymbol: 'CNO-CRO LP',
    tag: 'Core',
    lpAddresses: {
      97: '',
      25: '0xC20397D6D31d4A0ff76b94E4Eaed7a36f5c4d992',
    },
    token: serializedTokens.cake,
    quoteToken: serializedTokens.wcro,
  },
  {
    pid: 26,
    lpSymbol: 'USDC-CRO LP',
    tag: 'Core',
    lpAddresses: {
      97: '',
      25: '0x758d7c1EA85d709064fb5b73354a61BbfaF7273B',
    },
    token: serializedTokens.usdc,
    quoteToken: serializedTokens.wcro,
  },
  {
    pid: 8,
    lpSymbol: 'USDT-USDC LP',
    tag: 'Core',
    lpAddresses: {
      97: '0x3ed8936cAFDF85cfDBa29Fbe5940A5b0524824F4',
      25: '0x8c513e61462d5a9e574B1A13Cbd28CD0440A6D7d',
    },
    token: serializedTokens.usdt,
    quoteToken: serializedTokens.usdc,
  },
  {
    pid: 9,
    lpSymbol: 'DAI-USDC LP',
    tag: 'Core',
    lpAddresses: {
      97: '0x3ed8936cAFDF85cfDBa29Fbe5940A5b0524824F4',
      25: '0x0bfed62c922b14b9a47Ab800c89A3a952911Ed9C',
    },
    token: serializedTokens.dai,
    quoteToken: serializedTokens.usdc,
  },
  {
    pid: 27,
    lpSymbol: 'BNB-CRO LP',
    tag: 'AnySwap Bridge',
    lpAddresses: {
      97: '',
      25: '0xF8ea86FB1C99AE4b29A5F3c2f93454E560b74532',
    },
    token: serializedTokens.bnb,
    quoteToken: serializedTokens.wcro,
  },
  {
    pid: 28,
    lpSymbol: 'MATIC-CRO LP',
    tag: 'AnySwap Bridge',
    lpAddresses: {
      97: '',
      25: '0x16D5B9b5C0aAAF35F8D5Cb4996E60Dcf5EB66d1B',
    },
    token: serializedTokens.matic,
    quoteToken: serializedTokens.wcro,
  },
  // {
  //   pid: 29,
  //   lpSymbol: 'TUSD-USDC LP',
  //   tag: 'Core',
  //   lpAddresses: {
  //     97: '',
  //     25: '0x4d5c74C3b559C378411DbF673955A13932d6FA6d',
  //   },
  //   token: serializedTokens.tusd,
  //   quoteToken: serializedTokens.usdc,
  // },
  {
    pid: 30,
    lpSymbol: 'CRYSTL-CRO LP',
    tag: 'Partner',
    lpAddresses: {
      97: '',
      25: '0x92591aDD92FA326F8E7a87d7DFE44b3bDE09f919',
    },
    token: serializedTokens.crystl,
    quoteToken: serializedTokens.wcro,
  },
  {
    pid: 31,
    lpSymbol: 'DUO-CRO LP',
    tag: 'Partner',
    lpAddresses: {
      97: '',
      25: '0x0855E26c200733e39fF08F4Ab841B8d9Ef88824a',
    },
    token: serializedTokens.duo,
    quoteToken: serializedTokens.wcro,
  },
  {
    pid: 32,
    lpSymbol: 'CADDY-CRO LP',
    tag: 'Partner',
    lpAddresses: {
      97: '',
      25: '0xF2B4a602BB76574BE65da5b178f052561c663c12',
    },
    token: serializedTokens.caddy,
    quoteToken: serializedTokens.wcro,
  },
  {
    pid: 33,
    lpSymbol: 'LIQ-CRO LP',
    tag: 'Partner',
    lpAddresses: {
      97: '',
      25: '0x0616021F3526d67e70b6Ad206f909cCb000B31Dc',
    },
    token: serializedTokens.liq,
    quoteToken: serializedTokens.wcro,
  },
  {
    pid: 34,
    lpSymbol: 'AVAX-CRO LP',
    tag: 'AnySwap Bridge',
    lpAddresses: {
      97: '',
      25: '0xAC29B38f984DB1f345cD27c8e8683587F2f46FDE',
    },
    token: serializedTokens.avax,
    quoteToken: serializedTokens.wcro,
  },
  {
    pid: 35,
    lpSymbol: 'FTM-CRO LP',
    tag: 'AnySwap Bridge',
    lpAddresses: {
      97: '',
      25: '0x43B2B1c0c66A1509Ad3185E429dEc7B9dCd1629c',
    },
    token: serializedTokens.ftm,
    quoteToken: serializedTokens.wcro,
  },  
  {
    pid: 36,
    lpSymbol: 'LINK-CRO LP',
    tag: 'Core',
    lpAddresses: {
      97: '',
      25: '0x293794fC509Dfe6B88Afae029a62bfBD9e6ad902',
    },
    token: serializedTokens.link,
    quoteToken: serializedTokens.wcro,
  },
  {
    pid: 37,
    lpSymbol: 'ATOM-CRO LP',
    tag: 'Core',
    lpAddresses: {
      97: '',
      25: '0x48aA1415C7d83A34E11BC00DF43AECCA477a88E3',
    },
    token: serializedTokens.atom,
    quoteToken: serializedTokens.wcro,
  },
  {
    pid: 38,
    lpSymbol: 'ENJ-CRO LP',
    tag: 'Core',
    lpAddresses: {
      97: '',
      25: '0x32877055B930C1B3fF436885A638dD3758F8415d',
    },
    token: serializedTokens.enj,
    quoteToken: serializedTokens.wcro,
  },
  // {
  //   pid: 39,
  //   lpSymbol: 'TUSD-CRO LP',
  //   tag: 'Core',
  //   lpAddresses: {
  //     97: '',
  //     25: '0x912A03E194119a4B21b480Bf7054a580115d0E06',
  //   },
  //   token: serializedTokens.tusd,
  //   quoteToken: serializedTokens.wcro,
  // },
  {
    pid: 40,
    lpSymbol: 'USDT-CRO LP',
    tag: 'Core',
    lpAddresses: {
      97: '',
      25: '0x6ba5D840771ea8106809AbEa75687B404ad5eb30',
    },
    token: serializedTokens.usdt,
    quoteToken: serializedTokens.wcro,
  },
  {
    pid: 41,
    lpSymbol: 'DAI-CRO LP',
    tag: 'Core',
    lpAddresses: {
      97: '',
      25: '0x9B6c0bbC4f875642A2070A3951Ac6A0e5cD3e450',
    },
    token: serializedTokens.dai,
    quoteToken: serializedTokens.wcro,
  },
  {
    pid: 42,
    lpSymbol: 'BUSD-CRO LP',
    tag: 'AnySwap Bridge',
    lpAddresses: {
      97: '',
      25: '0x18A681D768436bD132cEDaaeD501897020Be1e15',
    },
    token: serializedTokens.busd,
    quoteToken: serializedTokens.wcro,
  },
  {
    pid: 43,
    lpSymbol: 'WBTC-CRO LP',
    tag: 'Core',
    lpAddresses: {
      97: '',
      25: '0xDCB4BEe1FBBE1486fb7061a424b6Ab765D0Bb269',
    },
    token: serializedTokens.wbtc,
    quoteToken: serializedTokens.wcro,
  },
  {
    pid: 44,
    lpSymbol: 'WETH-CRO LP',
    tag: 'Core',
    lpAddresses: {
      97: '',
      25: '0x43588f21115eb82C73D6118e82C637c6f4886367',
    },
    token: serializedTokens.weth,
    quoteToken: serializedTokens.wcro,
  },
  {
    pid: 45,
    lpSymbol: 'SHIB-CRO LP',
    tag: 'Core',
    lpAddresses: {
      97: '',
      25: '0x8D3E221C43496bEf4F92D60Fb2D962f1E52B6a92',
    },
    token: serializedTokens.shib,
    quoteToken: serializedTokens.wcro,
  },
  {
    pid: 46,
    lpSymbol: 'DOGE-CRO LP',
    tag: 'Core',
    lpAddresses: {
      97: '',
      25: '0x466aEB5b8cc0fa9558045349002E81680E028D3a',
    },
    token: serializedTokens.doge,
    quoteToken: serializedTokens.wcro,
  },
  {
    pid: 47,
    lpSymbol: 'ELON-CRO LP',
    tag: 'Core',
    lpAddresses: {
      97: '',
      25: '0x4BF5786CD6C9346C1821FD1791E3172D7c677b54',
    },
    token: serializedTokens.elon,
    quoteToken: serializedTokens.wcro,
  },
  {
    pid: 1,
    lpSymbol: 'CNO-CRO LP',
    tag: 'V1',
    lpAddresses: {
      97: '0x3ed8936cAFDF85cfDBa29Fbe5940A5b0524824F4',
      25: '0x4BbCE14d69F9fEA118992f1944c084753f1B0bf9',
    },
    token: serializedTokens.cake,
    quoteToken: serializedTokens.wcro,
  },
  {
    pid: 3,
    lpSymbol: 'WBTC-CRO LP',
    tag: 'V1',
    lpAddresses: {
      97: '0x3ed8936cAFDF85cfDBa29Fbe5940A5b0524824F4',
      25: '0x668F5A492E8bA1FB47c43D6e5F795d3b7C455A36',
    },
    token: serializedTokens.wbtc,
    quoteToken: serializedTokens.wcro,
  },
  {
    pid: 4,
    lpSymbol: 'WETH-CRO LP',
    tag: 'V1',
    lpAddresses: {
      97: '0x3ed8936cAFDF85cfDBa29Fbe5940A5b0524824F4',
      25: '0xD4260aaa913714056AbAad07C3E275f6445AcD0d',
    },
    token: serializedTokens.weth,
    quoteToken: serializedTokens.wcro,
  },
  {
    pid: 5,
    lpSymbol: 'USDC-CRO LP',
    tag: 'V1',
    lpAddresses: {
      97: '0x3ed8936cAFDF85cfDBa29Fbe5940A5b0524824F4',
      25: '0x92D38C70cA74d55f896814a01492Bde11b74c988',
    },
    token: serializedTokens.usdc,
    quoteToken: serializedTokens.wcro,
  },
  {
    pid: 6,
    lpSymbol: 'USDT-CRO LP',
    tag: 'V1',
    lpAddresses: {
      97: '0x3ed8936cAFDF85cfDBa29Fbe5940A5b0524824F4',
      25: '0xE396C4cCA895F27698aFe1233B17345F2Fe654cF',
    },
    token: serializedTokens.usdt,
    quoteToken: serializedTokens.wcro,
  },
  {
    pid: 7,
    lpSymbol: 'DAI-CRO LP',
    tag: 'V1',
    lpAddresses: {
      97: '0x3ed8936cAFDF85cfDBa29Fbe5940A5b0524824F4',
      25: '0xD2B2e708F5474C9aC42cdcDBEB06d5a59ec3Af2B',
    },
    token: serializedTokens.dai,
    quoteToken: serializedTokens.wcro,
  },
  {
    pid: 10,
    lpSymbol: 'BNB-CRO LP',
    tag: 'V1',
    lpAddresses: {
      97: '0x3ed8936cAFDF85cfDBa29Fbe5940A5b0524824F4',
      25: '0x47eDe971aD05d9E355F35aD3002fB71B52F50B6c',
    },
    token: serializedTokens.bnb,
    quoteToken: serializedTokens.wcro,
  },
  {
    pid: 11,
    lpSymbol: 'CNO-BUSD LP',
    tag: 'V1',
    lpAddresses: {
      97: '0x3ed8936cAFDF85cfDBa29Fbe5940A5b0524824F4',
      25: '0xBed3B43742dc04cD69B35b8FfBA7024e31cFf54a',
    },
    token: serializedTokens.cake,
    quoteToken: serializedTokens.busd,
  },
  {
    pid: 12,
    lpSymbol: 'MATIC-CRO LP',
    tag: 'V1',
    lpAddresses: {
      97: '0x3ed8936cAFDF85cfDBa29Fbe5940A5b0524824F4',
      25: '0xE3d8fbb05C1Ccc5f0De550f3157e3a938Ee49Bc0',
    },
    token: serializedTokens.matic,
    quoteToken: serializedTokens.wcro,
  },
  {
    pid: 13,
    lpSymbol: 'AVAX-CRO LP',
    tag: 'V1',
    lpAddresses: {
      97: '0x3ed8936cAFDF85cfDBa29Fbe5940A5b0524824F4',
      25: '0x1A831c5705dd1291AD3e9D15975a4CA8f7Bd5542',
    },
    token: serializedTokens.avax,
    quoteToken: serializedTokens.wcro,
  },
  {
    pid: 14,
    lpSymbol: 'FTM-CRO LP',
    tag: 'V1',
    lpAddresses: {
      97: '0x3ed8936cAFDF85cfDBa29Fbe5940A5b0524824F4',
      25: '0x46551F788208e0eF96Dd1e8Cee6B851413cD5c00',
    },
    token: serializedTokens.ftm,
    quoteToken: serializedTokens.wcro,
  },
  {
    pid: 15,
    lpSymbol: 'BUSD-CRO LP',
    tag: 'V1',
    lpAddresses: {
      97: '0x3ed8936cAFDF85cfDBa29Fbe5940A5b0524824F4',
      25: '0x34E5E44Ba12473AAEdC4567951113bB7E2DAe00F',
    },
    token: serializedTokens.busd,
    quoteToken: serializedTokens.wcro,
  },
  {
    pid: 16,
    lpSymbol: 'CROSHIBA-CRO LP',
    tag: 'V1',
    lpAddresses: {
      97: '0x3ed8936cAFDF85cfDBa29Fbe5940A5b0524824F4',
      25: '0x3b6745f6f6e3A35C416DF77E56b58afeD3fcf945',
    },
    token: serializedTokens.croshiba,
    quoteToken: serializedTokens.wcro,
  },
  {
    pid: 17,
    lpSymbol: 'DOGE-CRO LP',
    tag: 'V1',
    lpAddresses: {
      97: '0x3ed8936cAFDF85cfDBa29Fbe5940A5b0524824F4',
      25: '0x8eDabc18222bd0E983360E526b839683cf809c0e',
    },
    token: serializedTokens.doge,
    quoteToken: serializedTokens.wcro,
  },
  {
    pid: 18,
    lpSymbol: 'SHIB-CRO LP',
    tag: 'V1',
    lpAddresses: {
      97: '0x3ed8936cAFDF85cfDBa29Fbe5940A5b0524824F4',
      25: '0x2dCe362c941aD56A3fC25A272F4Fe53f7F934a27',
    },
    token: serializedTokens.shib,
    quoteToken: serializedTokens.wcro,
  },
  {
    pid: 19,
    lpSymbol: 'BUSD-USDC LP',
    tag: 'AnySwap Bridge',
    lpAddresses: {
      97: '0x3ed8936cAFDF85cfDBa29Fbe5940A5b0524824F4',
      25: '0x4d5c74C3b559C378411DbF673955A13932d6FA6d',
    },
    token: serializedTokens.busd,
    quoteToken: serializedTokens.usdc,
  },
  {
    pid: 20,
    lpSymbol: 'CRYSTL-CRO LP',
    tag: 'V1',
    lpAddresses: {
      97: '',
      25: '0xb00336649c04a073c2Dde47260618721b8223d94',
    },
    token: serializedTokens.crystl,
    quoteToken: serializedTokens.wcro,
  },
  {
    pid: 21,
    lpSymbol: 'DUO-CRO LP',
    tag: 'V1',
    lpAddresses: {
      97: '',
      25: '0x274704F4136d1810eF446bA2d5fe4db840f4603b',
    },
    token: serializedTokens.duo,
    quoteToken: serializedTokens.wcro,
  },
  {
    pid: 22,
    lpSymbol: 'CADDY-CRO LP',
    tag: 'V1',
    lpAddresses: {
      97: '',
      25: '0x332937463df26f46a1A715a41205765774Beef80',
    },
    token: serializedTokens.caddy,
    quoteToken: serializedTokens.wcro,
  },
  {
    pid: 23,
    lpSymbol: 'LIQ-CRO LP',
    tag: 'V1',
    lpAddresses: {
      97: '',
      25: '0x1554537da19cA2a4D6f2863c13F7ed598Ee17021',
    },
    token: serializedTokens.liq,
    quoteToken: serializedTokens.wcro,
  },
]

export default farms

# Opensea

### Github : https://github.com/CleverProgrammers/opensea-blockchain-youtube
### Youtube : https://www.youtube.com/watch?v=x3eRXeMB-4k

## Setting up Next.js

- bts-opensea-clean.vercel.app -> Connect -> connect with MetaMask 
- https://www.sanity.io/cleverprogrammer
- https://faucets.chain.link/rinkeby
- https://www.alchemy.com/
```
yarn create next-app -e with-tailwindcss opensea-blockchain-clone
npm install -g @sanity/cli
sanity init --coupon cleverprogrammer  
yarn add @3rdweb/sdk 
```
###### Rinkeby는 Ethereum testnet
###### Tailwind CSS는 Utility-First 컨셉을 가진 CSS 프레임워크
###### sanity는 블로그, 쇼핑몰 등에서 사용하는 여러 컨텐츠를 다양한 bulit-in 기능 등을 이용해 편리하게 관리할 수 있는 콘텐츠 관리 시스템
###### Thirdweb은 web3 프로젝트를 실행 및 관리할 수 있는 소프트웨어
###### Alchemy API는 블록체인 API

## Hero
![image](https://user-images.githubusercontent.com/62472117/163810338-f2f9597d-fa72-4e11-a7d1-7dd971609a49.png)
![image](https://user-images.githubusercontent.com/62472117/163810360-402f97dd-aa5d-4705-87db-2d1dbbe905a8.png)

## Add NFT Detail Page

###### Sanity 연결
```
import sanityClient from '@sanity/client'

export const client = sanityClient({
    projectId: '2c5itk6l',
    dataset: 'production',
    apiVersion: '2021-03-25',
    token: 'sktpV2Zxt57Q3MyCGMzAcmompxXyEiCyK0Urr9K6ucCKiwUBmbK6nPYx8PoWuJyWHta4S1pqjt67o2allHKMIGr0nwPwVqPkFtGeDaV1vkmS3qRaDpWJgMO35PmG2ETXeGifSV6YDZ2LBc1LSnKWi3WJYPK87GyaZ4ZwZSO4mJA3q5eeBIv6',
    useCdn: false,
})
```
###### Thirdweb 연결
```
const Nft = () => {
    const { provider } = useWeb3()
    const [selectedNft, setSelectedNft] = useState()
    const [listings, setListings] = useState([])
    const router = useRouter()

    const nftModule = useMemo(() => {
        if(!provider) return

        const sdk = new ThirdwebSDK(
            provider.getSigner(),
            'https://eth-rinkeby.alchemyapi.io/v2/juwAGi_bmgHHb6U9f8zmJq6h4kNbwTcf'
        )
        return sdk.getNFTModule('0x8D40Fc52b3f2c385C550c7e2855D6F119b10c65D')
    }, [provider])

    // get all NFTs in the collection
    useEffect(() => {
        if (!nftModule) return
        ;(async () => {
          const nfts = await nftModule.getAll()
    
          const selectedNftItem = nfts.find((nft) => nft.id === router.query.nftId)
    
          setSelectedNft(selectedNftItem)
        })()
      }, [nftModule])
```
![image](https://user-images.githubusercontent.com/62472117/163811334-54927a67-f076-4596-8641-0dff986bc36f.png)
![image](https://user-images.githubusercontent.com/62472117/163811394-1e9fbcb2-6b3e-483e-9234-0a33ef7f7a13.png)
![image](https://user-images.githubusercontent.com/62472117/163811436-cbce31b8-3c06-4985-9bd7-cabb62c83acc.png)

import React, { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useWeb3 } from '@3rdweb/hooks'
import { client } from '../../lib/sanityClient'
import { ThirdwebSDK } from '@3rdweb/sdk'
import Header from '../../components/Header'
import { CgWebsite } from 'react-icons/cg'
import { AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai'
import { HiDotsVertical } from 'react-icons/hi'
import NFTCard from '../../components/NFTCard'

const style = {
    bannerImageContainer: `h-[20vh] w-screen overflow-hidden flex justify-center items-center`,
    bannerImage: `w-full object-cover`,
    infoContainer: `w-screen px-4`,
    midRow: `w-full flex justify-center text-white`,
    endRow: `w-full flex justify-end text-white`,
    profileImg: `w-40 h-40 object-cover rounded-full border-2 border-[#202225] mt-[-4rem]`,
    socialIconsContainer: `flex text-3xl mb-[-2rem]`,
    socialIconsWrapper: `w-44`,
    socialIconsContent: `flex container justify-between text-[1.4rem] border-2 rounded-lg px-2`,
    socialIcon: `my-2`,
    divider: `border-r-2`,
    title: `text-5xl font-bold mb-4`,
    createdBy: `text-lg mb-4`,
    statsContainer: `w-[44vw] flex justify-between py-4 border border-[#151b22] rounded-xl mb-4`,
    collectionStat: `w-1/4`,
    statValue: `text-3xl font-bold w-full flex items-center justify-center`,
    ethLogo: `h-6 mr-2`,
    statName: `text-lg w-full text-center mt-1`,
    description: `text-[#8a939b] text-xl w-max-1/4 flex-wrap mt-4`,
}

const Collection = () => {
    const router = useRouter()
    const {provider} = useWeb3()
    const {collectionId} = router.query
    const [collection, setCollection] = useState({})
    const [nfts, setNfts] = useState([])
    const [listings, setListings] = useState([])

    const nftModule = useMemo(() => {
        if (!provider) return

        const sdk = new ThirdwebSDK(
            provider.getSigner(),
            'https://eth-rinkeby.alchemyapi.io/v2/juwAGi_bmgHHb6U9f8zmJq6h4kNbwTcf'
        )
        return sdk.getNFTModule(collectionId)
    }, [provider])

    // get all NFTs in the collection
    useEffect(() => {
        if(!nftModule) return
        ;(async () => {
            const nfts =await nftModule.getAll()
            setNfts(nfts)
        })()
    }), [nftModule]

    const marketPlaceModule = useMemo(() => {
        if(!provider) return

        const sdk = new ThirdwebSDK(
            provider.getSigner(),
            'https://eth-rinkeby.alchemyapi.io/v2/juwAGi_bmgHHb6U9f8zmJq6h4kNbwTcf'
        )
        // return sdk.getMarketplaceModule(
        //     ''
        // )
    },[provider])

    // get all listing in the collection

    useEffect(() => {
        if(!marketPlaceModule) return
        ;(async () => {
            setListings(await marketPlaceModule.getAllListings())
        })()
    }, [marketPlaceModule])

    

    const fetchCollectionData = async(sanityClient = client) => {
        const query = `*[_type == "marketItems" && contractAddress == "0x8D40Fc52b3f2c385C550c7e2855D6F119b10c65D"] {
            "imageUrl": profileImage.asset->url,
            "BannerImageUrl": bannerUmage.asset->url,
            volumeTraded, createdBy, contractAddress,
            "creator":createdBy->userName,
            title, floorPrice,
            "allOwners":owners[]->, description 
          }`
      const collectionData = await sanityClient.fetch(query)

      console.log(collectionData, '🔥')

      // the query returns 1 objects inside of an array
      await setCollection(collectionData[0])
    }

    useEffect(() => {
        fetchCollectionData()
    }, [collectionId])

    console.log(router.query)
    console.log(router.query.CollectionId)
    return(
        <div className="overflow-hidden">
            <Header/>
            <div className={style.bannerImageContainer}>
                <img className={style.bannerImage}
                src ={collection?.bannerImageUrl ? collection.bannerImageUrl : 'https://lh3.googleusercontent.com/i5dYZRkVCUK97bfprQ3WXyrT9BnLSZtVKGJlKQ919uaUB0sxbngVCioaiyu9r6snqfi2aaTyIvv6DHm4m2R3y7hMajbsv14pSZK8mhs=s2500'}
                alt="banner"/>
            </div>
            <div className={style.infoContainer}>
                <div className={style.midRow}>
                    <img className={style.profileImg}
                    src={collection?.imageUrl ? collection.imageUrl : 'https://lh3.googleusercontent.com/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB=s130'}
                    alt="profile image"/>
                </div>
                <div className={style.endRow}>
                    <div className={style.socialIconsContainer}>
                        <div className={style.socialIconsWrapper}>
                            <div className={style.socialIconsContent}>
                                <div className={style.socialIcon}>
                                    <CgWebsite/>
                                </div>
                                <div className={style.divider}/>
                                <div className={style.socialIcon}>
                                    <AiOutlineInstagram/>
                                </div>
                                <div className={style.divider}/>
                                <div className={style.socialIcon}>
                                    <AiOutlineTwitter/>
                                </div>
                                <div className={style.divider}/>
                                <div className={style.socialIcon}>
                                    <HiDotsVertical/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.midRow}>
                    <div className={style.title}>{collection?.title}</div>
                </div>
                <div className={style.midRow}>
                    <div className={style.createdBy}>
                        created by{' '}
                        <span className="text-[#2081e2]">{collection?.creator}</span>
                    </div>
                </div>
                <div className={style.midRow}>
                    <div className={style.statsContainer}>
                        <div className={style.collectionStat}>
                            <div className={style.statValue}>{nfts.length}</div>
                            <div className={style.statName}>items</div>
                        </div>
                        <div className={style.collectionStat}>
                            <div className={style.statValue}>
                                {collection?.allOwners ? collection.allOwners.length:''}
                            </div>
                            <div className={style.statName}>owners</div>
                        </div>
                        <div className={style.collectionStat}>
                            <div className={style.statValue}>
                                <img src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg" alt="eth" className={style.ethLogo}/>
                                {collection?.floorPrice}
                            </div>
                            <div className={style.statName}>floor price</div>
                        </div>
                        <div className={style.collectionStat}>
                            <div className={style.statValue}>
                                <img src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg" alt="eth" className={style.ethLogo}/>
                                {collection?.volumeTraded}.5k
                            </div>
                            <div className={style.statName}>volume traded</div>
                        </div>
                    </div>
                </div>
                <div className={style.midRow}>
                    <div className={style.description}>{collection?.description}</div>
                </div>
            </div>
            <div className="flex flex-wrap ">
                {nfts.map((nftItem, id) => (
                <NFTCard
                    key={id}
                    nftItem={nftItem}
                    title={collection?.title}
                    listings={listings}
                />
                ))}
      </div>
        </div>
    )
}
export default Collection
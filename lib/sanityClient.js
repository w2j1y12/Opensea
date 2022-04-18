import sanityClient from '@sanity/client'

export const client = sanityClient({
    projectId: '2c5itk6l',
    dataset: 'production',
    apiVersion: '2021-03-25',
    token: 'sktpV2Zxt57Q3MyCGMzAcmompxXyEiCyK0Urr9K6ucCKiwUBmbK6nPYx8PoWuJyWHta4S1pqjt67o2allHKMIGr0nwPwVqPkFtGeDaV1vkmS3qRaDpWJgMO35PmG2ETXeGifSV6YDZ2LBc1LSnKWi3WJYPK87GyaZ4ZwZSO4mJA3q5eeBIv6',
    useCdn: false,
})
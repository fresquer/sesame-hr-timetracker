import type { NextPage } from 'next'
import { AppHeader } from '../components/header/header'
import { Seo } from '../components/shared/seo'

const Home: NextPage = () => {
  return (
    <>
      <Seo></Seo>
      <div id='index'>
        <AppHeader></AppHeader>
      </div>
    </>
  )
}

export default Home

import BlogTitle from '@/components/layout/BlogTitle'
import CommonWrapper from '@/components/layout/CommonWrapper'
import BlogCard from '@/components/parts/BlogCard'
import MyCartP from '@/components/productsComponent/MyCart'
import WebFutures from '@/components/section/WebFutures'
import React from 'react'

function MyCartPage() {
  return (
    <div>

      <MyCartP/>

      <WebFutures/>

       <CommonWrapper>
        <BlogTitle title={'Our Latest Blog'} description={'Get Your Desired Product from Featured Category!'} btnText={'Read All'} btnLink={'#'} />
        <BlogCard limit={3} />
       </CommonWrapper>
      
    </div>
  )
}

export default MyCartPage
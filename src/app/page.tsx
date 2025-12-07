import CommonWrapper from '@/components/layout/CommonWrapper';
import Hero from '@/components/section/Hero';
import AllBrands from '@/components/section/AllBrands';
import SectionTitle from '@/components/layout/SectionTitle';
import CategorySmall from '@/components/section/CategorySmall';
import ProductView from '@/components/section/ProductView';
import WebFutures from '@/components/section/WebFutures';
import CustomerSays from '@/components/section/CustomerSays';
import BlogTitle from '@/components/layout/BlogTitle';
import BlogCard from '@/components/parts/BlogCard';
import Footer from '@/components/section/Footer';

export default function Home() {
  return (
    <>
      {/* <NavbarTop /> */}
      {/* <Navbar /> */}
      {/* <Manubar /> */}
      {/* <NavbarCategory /> */}
      <Hero />
      <AllBrands />

      <CommonWrapper>
        <SectionTitle title={'Products By'} titleInColor={'Category'} description={'Get Your Desired Product from Featured Category!'} />
        <CategorySmall />
        
        <SectionTitle title={'Featured'} titleInColor={'Products'} description={'Get Your Desired Product from Featured Category!'} />
        <ProductView limit={8} />
        
        <SectionTitle title={'Top Selling'} titleInColor={'Products'} description={'Get Your Desired Product from Featured Category!'} />
        <ProductView limit={12} />
      </CommonWrapper>

      <WebFutures />
      
      <CommonWrapper>
        <SectionTitle title={'Our Customers'} titleInColor={'Says'} description={'Get Your Most Valueable Customers Thinkings & Feedback'} />
        <CustomerSays />
        
        <BlogTitle title={'Our Latest Blog'} description={'Get Your Desired Product from Featured Category!'} btnText={'Read All'} btnLink={'#'} />
        <BlogCard limit={3} />
      </CommonWrapper>

      <Footer />
    </>
  );
}

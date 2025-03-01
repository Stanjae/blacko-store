import Banners3 from "../components/Banners3";
import CategoryImageBoxGroup from "../components/CategoryImageBoxGroup";
import CategoryProductGrid from "../components/CategoryProductGrid";
import DealOfTheDay from "../components/DealOfTheDay";
import FinalReductionBanners from "../components/FinalReductionBanners";
import HomeSectionA from "../components/HomeSectionA";
import HomeSectionMarquee from "../components/HomeSectionMarquee";
import IconBoxGroup from "../components/IconBoxGroup";
import BannerB from "../components/BannerB";
import SponsorBrandBanner from "../components/SponsorBrandBanner";
import SelectedProductsSection from "../components/SelectedProductsSection";
import { Suspense } from "react";
import LayoutSkeleton from "../components/layouts/LayoutSkeleton";
import { categoryMenu } from "@/utils/CategoryList";
import { getVarietyProducts } from "../lib/data";


export default async function Home() {
  const response =  await getVarietyProducts('weekend-sales', 4)
  const electronicCategory = categoryMenu.find(c => c.title == "Electronics & Gadgets")?.categories
  const clothingFashion = categoryMenu.find(c => c.title == "Clothing & Fashion")?.categories
  const homeFurniture = categoryMenu.find(c => c.title == 'Home & Furniture')?.categories
  
  return (
    <main className=" overflow-hidden font-[family-name:var(--font-geist-sans)]">
      <HomeSectionA/>
      <IconBoxGroup/>
      <CategoryImageBoxGroup/>
      <HomeSectionMarquee/>
      <Suspense fallback={<LayoutSkeleton arrayCount={5} gridColumn={10} gridSizeMd={2} gridSizeSm={5}/>}>
        <DealOfTheDay/>
      </Suspense>
      <Banners3/>
        <CategoryProductGrid fnParams={{category1:'electronics', title: 'wireless', category2:'smartphones'}} categoryList={electronicCategory} title="Electronic"/>
      <FinalReductionBanners/>
      <CategoryProductGrid categoryList={clothingFashion} fnParams={{category1:"mens-fashion", title:'clothes', category2:"womens-fashion"}} title="Clothing & Fashion"/>
      <BannerB/>
      <CategoryProductGrid categoryList={homeFurniture} fnParams={{category1:"kitchen", title:'furniture', category2:"lighting"}} title="Home & Furniture"/>
      <SponsorBrandBanner/>
      <SelectedProductsSection response={response}/>
    </main>
  );
}

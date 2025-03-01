import { AutoStories, Chair, Checkroom, Devices, ElectricCar, HealthAndSafety, Spa, Sports, Toys } from "@mui/icons-material";

export const categoryMenu = [
   
    { title: 'Clothing & Fashion', icon:<Checkroom/>, categories:[
        { title: 'Mens Fashion', value: 'mens-fashion' },
        { title: 'Womens Fashion', value: 'womens-fashion' },
        { title: 'Kids & Baby Clothes', value: 'kids-clothes' },
        { title: 'Shoes & Sneakers', value: 'shoes' },
        { title: 'Accessories & Jewelry', value: 'accessories' },
    ]},
        
  
    { title: 'Electronics & Gadgets', icon:<Devices/>, categories:[
        { title: 'Mobile Phones', value: 'mobiles' },
        { title: 'Tablets & Accessories', value: 'tablets' },
        { title: 'Laptops & Computers', value: 'laptops' },
        { title: 'Smartwatches & Wearables', value: 'smartwatches' },
        { title: 'Headphones & Audio', value: 'headphones' },
    ] },
  
    { title: 'Home & Furniture', icon:<Chair/>, categories:[
        { title: 'Furniture & Decor', value: 'furniture' },
        { title: 'Kitchen Appliances', value: 'kitchen' },
        { title: 'Home Essentials', value: 'home-essentials' },
        { title: 'Lighting & Fixtures', value: 'lighting' },
    ] },
        
  
    { title: 'Beauty & Personal Care', icon:<Spa/>, categories:[
        { title: 'Skincare', value: 'skincare' },
        { title: 'Makeup & Cosmetics', value: 'makeup' },
        { title: 'Haircare', value: 'haircare' },
        { title: 'Fragrances & Perfumes', value: 'fragrances' },
    ] },
        
  
    { title: 'Sports & Outdoors', icon:<Sports/>, categories:[
        { title: 'Fitness Equipment', value: 'fitness' },
        { title: 'Sportswear', value: 'sportswear' },
        { title: 'Outdoor Gear', value: 'outdoor' },
    ] },
        
  
    { title: 'Toys & Games', icon:<Toys/>, categories:[
        { title: 'Kids’ Toys', value: 'kids-toys' },
        { title: 'Board Games', value: 'board-games' },
        { title: 'Gaming Consoles', value: 'gaming-consoles' },
    ] },
  
    { title: 'Automobile & Accessories', icon:<ElectricCar/>, categories:[
        { title: 'Automobiles', value: 'automobiles' },
        { title: 'Car Accessories', value: 'car-accessories' },
        { title: 'Motorcycle Gear', value: 'motorcycle-gear' },
    ] },
  
    { title: 'Books & Stationery', icon:<AutoStories/>, categories:[
        { title: 'Fiction & Non-Fiction', value: 'fiction' },
        { title: 'Educational Books', value: 'educational-books' },
    ] },
       
  
    { title: 'Health & Wellness', icon:<HealthAndSafety/>, categories:[
        { title: 'Supplements & Vitamins', value: 'supplements' },
        { title: 'Gym & Yoga Accessories', value: 'gym-yoga' },
    ] },
        
]
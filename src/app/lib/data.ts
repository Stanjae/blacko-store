import { client, clienty } from "@/sanity/client"
import { allInfoType, CartProductType, DetailedProductStoreType, MonnfiyRespone } from "@/utils/definitions"
import { revalidatePath } from "next/cache"

export const getVarietyProducts = async(status:string, limit:number)=>{
    const query = `*[_type == "product" && status == "${status}"] | order(_createdAt asc) [0..${limit}]`
    const response = await client.fetch(query)
    return response
}

export const getOrderReference = async(paymentRef:string)=>{
    const query = `*[_type == "order" && paymentReference == "${paymentRef}"] [0]`
    const response = await client.fetch(query)
    return response;

}

export const getAllProducts = async(sort?:string | undefined, newQuery?:string | undefined, 
    newPriceRange?:string | undefined, newRatings?:string | number, newCategory?:string | undefined)=>{
    const filters = [`_type == "product"`]

    if (newQuery) {
        filters.push(
          `(title match "${newQuery}" || description match "${newQuery}" || tags match "${newQuery}")`
        );
    }

    if (newCategory) {
        filters.push(
          `(category match "${newCategory}")`
        );
    }

        // Ratings Filter (Ensure it's a valid number)
    if (newRatings) {
        filters.push(`round(math::avg(rating)) == ${newRatings}`);
    }

    // Price Range Filter (Assuming newPriceRange is something like "10-50")
    if (newPriceRange) {
        const [minPrice, maxPrice] = newPriceRange?.split(",").map((item)=> Number(item));
        if (!isNaN(minPrice) && !isNaN(maxPrice)) {
        filters.push(`basePrice >= ${minPrice} && basePrice <= ${maxPrice}`);
        }
    }

    let query = `*[${filters.join(" && ")}]`;

    // Sorting Logic
    const sortOptions: Record<string, string> = {
        "price-low-to-high": "basePrice asc",
        "price-high-to-low": "basePrice desc",
        "newest-first": "_createdAt desc",
        "top-rated": "math::avg(rating) desc",
    };

    if (sort && sortOptions[sort]) {
        query += ` | order(${sortOptions[sort]})`;
    }

    const response = await client.fetch(query)
    return response
}

export const getCustomCategories = async(params1:string, params2:string, params3:string, limit:number)=>{
    const query = `*[_type == "product" && category match "${params1}" || title match "${params2}" || category match "${params3}"] [0..${limit}]`
    const response = await client.fetch(query)
    return response
}

export const getProductBySlug = async(productSlug: string) => {
    const query =  `*[_type == "product" && slug.current == "${productSlug}"] [0] {_id, title, basePrice, discount, 
        "rating_count":count(rating), "rating":round(math::avg(rating)), sizes, variations, shippingStatus, 
        status, slug, thumbnail, description, images, quantity, "shopId":shopId->{title, slug, shop_image}}`;
    const response = await client.fetch(query)
    return response
}


/* mutations */

export const addRating = async(productId:string | undefined, rating:number | null)=>{
    try{
        await clienty.patch(productId as string).setIfMissing({rating: []}).append('rating', [rating])
        .commit({autoGenerateArrayKeys: true})
    }catch(err){
        console.log('Error adding rating:', err);
    }
    revalidatePath('/product/*');
}

export const createTransactionOrder =async(response:MonnfiyRespone, userInfo:allInfoType, products:string)=>{
    const doc = {
        _type: 'order',
        customer_name: userInfo.fullName,
        customer_email: userInfo.email,
        customer_address: userInfo.address,
        customer_company: userInfo.company,
        reference_id: response.transactionReference,
        total_amount: response.authorizedAmount,
        note: userInfo.note,
        products,
        customer_zipcode: userInfo.zipcode,
        customer_country: userInfo.country,
        customer_state: userInfo.state,
        customer_lga: userInfo.lga,
        customer_phone_number: userInfo.phoneNumber,
        paymentReference: response.paymentReference,
        transaction_status:response.status
      }
      try{
        await clienty.create(doc);
        return true
      }catch(err){
        console.log('Error creating order:', err);
        return false
      }
      
}


export const updateProductQuantity = async (cart: CartProductType[]) => {
        try {
          // Create an array of mutations for batch update
          const mutations = await Promise.all(cart.map(async (item) => {
            if (!item.variantInfo) {
              // Decrease stock for products with variant information
              return {
                patch: {
                  id: item._id,
                  dec: { quantity: item.quantity }, // Reduce stock based on purchased quantity
                },
              };
            } else {
              // Fetch product details from Sanity
              const product:DetailedProductStoreType = await client.fetch(`*[_id == $productId][0]`, { productId: item._id });
      
              if (!product || !product.variations) {
                throw new Error(`Product or variations not found for ID: ${item._id}`);
              }
      
              // Update variations stock
              const updatedVariations = product.variations.map((variation) => ({
                ...variation,
                size: variation.size.map((sizeItem) => {
                  const purchasedItem = cart.find(
                    (pItem) =>
                      pItem.variantInfo?._key === variation._key &&
                      pItem?.variantInfo.variant === sizeItem.variant
                  );
      
                  return purchasedItem
                    ? { ...sizeItem, unit: Math.max(sizeItem.unit - purchasedItem.quantity, 0) }
                    : sizeItem;
                }),
              }));
      
              // Return a mutation for updating product variations
              return {
                patch: {
                  id: item._id,
                  set: { variations: updatedVariations },
                },
              };
            }
          }));
      
          // Execute batch mutation transaction
          await client.transaction(mutations).commit();
      
          return true;
        } catch (error) {
          console.error('Error updating product quantity:', error);
          return false;
        }
      };
      
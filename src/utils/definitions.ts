import { cartFormSchema, cartShippingSchema, shippingAddressSchema } from "./zod";
import { z } from 'zod';


export type ReviewsType ={
 _id:string;
 userid:string;
 reviewText:string;
 createdAt:string | Date;
}
type ImageType =  {
    _type: string;
    _key: string;
    asset: {
      _type:string
      _ref: string;
    }
}
export type ProductType ={
    _id:string;
    title:string;
    basePrice:number;
    slug:{current:string};
    _createdAt?:string;
    description:string;
    quantity?:number;
    rating?:number[];
    thumbnail: {
      asset: {
        _ref: string;
      }
    };
    images?:ImageType[];
    category?:string;
    tags?:string[],
    published?:boolean;
    discount?:number;
    shopId?:string;
    sizes?:string[];
    shippingStatus?:number;
    variations?:string[];
}



export type ProductStoreType = {
    _id:string;
    title:string;
    status:string;
    basePrice:number;
    discount:number;
    shippingStatus: number;
    slug:{current:string};
    _createdAt?:string;
    quantity?:number;
    rating?:number[];
    thumbnail: {
    asset: {
      _ref: string;
    }
  };
}

export type DetailedProductStoreType = {
  "rating_count": string;
  "shopId": {
    "title": string;
    "slug": {
      "current": string,
      "_type": string
    },
    "shop_image": {
      "_type": string;
      "asset": {
        "_ref": string,
        "_type": string
      }
    }
  };
  "discount": number
  "basePrice": number
  "sizes"?: string[] | null | undefined;
  "slug": {
    "current":string;
    "_type": string;
  };
  "thumbnail": {
    "_type": string;
    "asset": {
      "_ref": string;
      "_type": "reference"
    }
  };
  quantity?: number;
  "_id": string;
  variations:
    {
      "size":
        {
          "unit": number,
          "variant": string,
          "_key"?: string
        }[];
      "discount": number;
      "_key": string;
      "newPrice": number;
      "imageVariant": {
        "_type": "image",
        "asset": {
          "_ref": string;
          "_type": "reference"
        }
      },
      "color": string
    }[];
  "description": string;
  "images": 
    {
      "_type": string,
      "asset": {
        "_ref": string,
        "_type": "reference"
      }
    }[];
  "title": string;
  "shippingStatus": number;
  "status": "weekend-sales" | 'deals-for-today' | 'mega-offers' | 'flash-sales' | 'shipped-from-abroad';
  "rating": number
}

export type CartProductType = {
  _id: string;
  price: number;
  title: string;
  thumbnail: string;
  benchMarkQuty: number | undefined;
  quantity: number;
  shippingStatus: number;
  variantInfo?: {
      unit: number;
      variant: string;
      _key?: string;
  } | null;
}

export type MonnfiyRespone ={
  authorizedAmount:number;
  message:"Transaction Successful" | "Transaction Failed";
  paidOn: undefined;
  paymentReference: string;
  redirectUrl : undefined;
  status : "SUCCESS" | string;
  transactionReference: string;
}


/*-------------------------- forms ---------------------- */

export type CartFormType = z.infer<typeof cartFormSchema>;

export type ShippingFormType =  z.infer<typeof shippingAddressSchema>;

export type CartShippingType = z.infer<typeof cartShippingSchema >


export type allInfoType = CartFormType & ShippingFormType & {
  state:string;
  lga:string;
  country:string
};

export type OrderReferenceType = {
  customer_name:string;
  customer_email:string;
  customer_address:string;
  customer_phone_number:string;
  customer_lga:string;
  customer_state:string;
  customer_country:string;
  customer_zipcode:string;
  total_amount:number;
  reference_id:string;
  note:string;
  paymentReference:string;
  products:string;
  transaction_status:"SUCCESS"|"ERROR"|string
}
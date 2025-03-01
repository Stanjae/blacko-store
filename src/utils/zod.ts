import { z } from 'zod';

export const cartFormSchema = z.object({
  note: z.string().optional(),
  zipcode:z.string().max(6, "Cant be more than 6 characters")
});


export const shippingAddressSchema = z.object({
    fullName: z.string().nonempty().min(2, "First name must be at least 2 characters"),
    address: z.string().nonempty().min(5, "Street must be at least 5 characters"),
    company: z.string().min(2, "City must be at least 2 characters"),
    email: z.string().email({message:'Invalid Email'}).min(2, "State must be at least 2 characters"),
    phoneNumber: z.string().nonempty().max(12, "Cant be more than 11 characters")
  });


  export const cartShippingSchema = z.object({
    ...cartFormSchema.shape, ...shippingAddressSchema.shape
  })




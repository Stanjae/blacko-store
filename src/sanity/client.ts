import { createClient } from "next-sanity";
import {createClient as createClient1} from '@sanity/client'

export const client = createClient({
  projectId: "zeun7za7",
  dataset: "blacko",
  apiVersion: "2024-01-01",
  token:process.env.NEXT_PUBLIC_SANITY_TOKEN,
  useCdn: false,
  ignoreBrowserTokenWarning:true
});


export const clienty = createClient1({
  projectId: "zeun7za7",
  dataset: "blacko",
  apiVersion: "2024-01-01",
  token:process.env.NEXT_PUBLIC_SANITY_TOKEN,
  useCdn: true,
});

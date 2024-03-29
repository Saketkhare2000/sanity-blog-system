import { createClient } from "next-sanity";
import urlBuilder from "@sanity/image-url";
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID; // "pv8y60vp"
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET; // "production"
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-05-03";

export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
});

export const urlFor = (source: string) => {
    return urlBuilder(client).image(source);
};

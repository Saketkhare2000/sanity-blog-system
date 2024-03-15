import { PostData } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import { PortableText } from "@portabletext/react";
import Head from "next/head";
import Image from "next/image";

async function getPostData(slug: string) {
    const query = `*[_type=='post' && slug.current =='${slug}'] | order(_createdAt asc){
        "mainImage":mainImage.asset._ref,
        "currentSlug":slug.current,
        title,
        publishedAt,
        body
      }[0]`;

    const data: PostData = await client.fetch(query);

    return data;
}

export default async function Blog({ params }: { params: { slug: string } }) {
    const data = await getPostData(params.slug);

    <Head>
        <title>{data.title}</title>
        <meta name="description" content={data.title} />
        {/* //Og Image */}
        <meta property="og:title" content={data.title} />
        <meta property="og:description" content={data.title} />
        <meta
            property="og:image"
            content={urlFor(data.mainImage).url() as string}
        />
    </Head>;

    const portableTextComponents = {
        types: {
            image: ({ value }: any) => {
                return (
                    <Image
                        alt={value.alt}
                        width={1920}
                        height={1080}
                        layout="responsive"
                        priority
                        className="rounded object-cover"
                        src={urlFor(value.asset._ref).url()}
                    />
                );
            },
            callToAction: ({ value, isInline }: any) =>
                isInline ? (
                    <a href={value.url}>{value.text}</a>
                ) : (
                    <div className="callToAction">{value.text}</div>
                ),
        },
    };

    return (
        <div className="prose w-full dark:prose-invert py-10 mx-auto">
            <div className="flex flex-col gap-2">
                <h2 className="text-balance m-0">{data.title}</h2>

                <p>{new Date(data.publishedAt).toDateString()}</p>
            </div>

            <div>
                <Image
                    width={1000}
                    height={500}
                    src={urlFor(data.mainImage).url() as string}
                    alt={data.title}
                    className="w-full rounded-lg"
                    priority
                />
            </div>
            <PortableText
                value={data.body}
                components={portableTextComponents}
            />
        </div>
    );
}

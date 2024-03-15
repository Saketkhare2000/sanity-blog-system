import Image from "next/image";
import Navbar from "./components/Navbar";
import { Post } from "./lib/interface";
import { client, urlFor } from "./lib/sanity";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";

async function getPosts() {
    const query = `*[_type=='post'] | order(_createdAt asc){
        "mainImage":mainImage.asset._ref,
        "currentSlug":slug.current,
        title,
        publishedAt,
      }`;

    const data: Post[] = await client.fetch(query);

    return data;
}

export default async function Home() {
    const data = await getPosts();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-10">
            {data.map((post) => (
                <Link href={`/blog/${post.currentSlug}`} key={post.currentSlug}>
                    <Card className="flex flex-col gap-2">
                        <CardContent className="px-2 py-4">
                            <Image
                                width={1000}
                                height={500}
                                src={urlFor(post.mainImage).url() as string}
                                alt={post.title}
                                className="w-full rounded-lg"
                                priority
                            />
                        </CardContent>
                        <CardFooter className="flex flex-col gap-2 items-start">
                            <h2 className="text-xl font-bold text-balance">
                                {post.title}
                            </h2>
                            <p className="text-gray-500">
                                {new Date(post.publishedAt).toDateString()}
                            </p>
                        </CardFooter>
                    </Card>
                </Link>
            ))}
        </div>
    );
}

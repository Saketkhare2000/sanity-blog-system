export interface Post {
    mainImage: string;
    currentSlug: string;
    title: string;
    publishedAt: string;
}

export interface PostData extends Post {
    body: Block[];
}

interface Block {
    _key: string;
    _type: "block";
    children: Span[];
    markDefs: any[];
    style: "normal" | "h1" | "h2" | "h3" | "h4" | "blockquote";
}

interface Span {
    _key: string;
    _type: "span";
    marks: string[];
    text: string;
}

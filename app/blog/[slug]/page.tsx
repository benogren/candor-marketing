import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import { formatDate, getBlogPosts } from 'app/blog/utils'
import { baseUrl } from 'app/sitemap'
import { radley } from 'app/components/fonts'
import { Button } from '../../../@/components/ui/button';
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export async function generateStaticParams() {
  let posts = await getBlogPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata(props) {
  // ✅ Properly await params
  const { params } = props;
  const resolvedParams = await params;

  const posts = await getBlogPosts();
  const post = posts.find((post) => post.slug === resolvedParams.slug);

  if (!post) return;

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;

  const ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog(props) {
  // ✅ Properly await params
  const { params } = props;
  const resolvedParams = await params;

  const posts = await getBlogPosts();
  const post = posts.find((post) => post.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  // Debug: Log the content to see what we're getting
  // console.log('Post content length:', post.content.length);
  // console.log('Post content preview:', post.content.substring(0, 200));
  // console.log('Post metadata:', post.metadata);

  return (
    <>
    <div className='container mx-auto px-4 pt-8 max-w-3xl'>
    <Link href="/blog" className='flex items-center mb-8 text-cerulean-300 hover:text-cerulean-600 transition-colors'>
      <ArrowLeft className='mr-2 w-4 h-4' /> Back to Blog
    </Link>
    </div>
    <div className='container mx-auto px-4 pb-8 max-w-3xl blog-post'>
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'My Portfolio',
            },
          }),
        }}
      />
      <h1 className={`text-4xl font-light text-cerulean ${radley.className}`}>
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <span className="text-sm text-slate-500">
          {formatDate(post.metadata.publishedAt)}
        </span>
      </div>

      <article
        className="prose"
        
      >
        <CustomMDX source={post.content} />
      </article>
    </section>

    
    </div>
    </>
  )
}
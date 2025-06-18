import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'
import { radley } from 'app/components/fonts'

export async function BlogPosts() {
  let allBlogs = await getBlogPosts()

  return (
    <div>
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {allBlogs
            .sort((a, b) => {
              if (
                new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
              ) {
                return -1
              }
              return 1
            })
            .map((post) => (
              <Link
                key={post.slug}
                className="mt-4 rounded-lg shadow-lg bg-gradient-to-bl from-slate-50 to-white p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out"
                href={`/blog/${post.slug}`}
              >
                <h3 className={`text-xl sm:text-2xl font-light text-nonphotoblue-600 ${radley.className}`}>
                  {post.metadata.title}
                  <span className='text-sm block'>{formatDate(post.metadata.publishedAt, false)}</span>
                </h3>
                <p className="text-slate-500 text-sm sm:text-base font-light mt-2">
                  {post.metadata.summary}
                </p>
              </Link>
            ))}
          </div>
        </div>
    </div>
  )
}

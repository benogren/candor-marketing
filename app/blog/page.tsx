import { BlogPosts } from 'app/components/posts'
import { radley } from 'app/components/fonts'

export const metadata = {
  title: 'Blog',
  description: 'Read my blog.',
}

export default function Page() {
  return (
    <>
    <h2 className={`text-3xl sm:text-4xl font-light text-nonphotoblue-600 text-center ${radley.className} mt-12 mb-4`}>
        Recent Posts:
    </h2>
    <section className="container mx-auto px-4 pb-8 mb-12">
      <BlogPosts />
    </section>
    </>
  )
}

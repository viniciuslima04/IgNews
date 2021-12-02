import Head from 'next/head'
import styles from './styles.module.scss';
import Prismic from '@prismicio/client'
import { GetStaticProps } from 'next';
import { RichText } from 'prismic-dom'
import { getPrismicClient } from '../../services/prismic';
import Link from 'next/link';

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
};

interface PostsProps {
  posts: Post[]
}

export default function Posts({ posts }: PostsProps) {
  return (
    <>

      <Head>
        <title>Posts | IgNews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>

          {posts.map(post => (
            <Link href={`/posts/${post.slug}`}>
              <a key={post.slug}>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()

  const response = await prismic.query([
    Prismic.Predicates.at('document.type', 'publication')
  ], {
    fetch: ['publication.title', 'publication.content'],
    pageSize: 100,
  })

  const posts = response.results.map(posts => {
    return {
      slug: posts.uid,
      title: RichText.asText(posts.data.title),
      excerpt: posts.data.content.find(content => content.type === 'paragraph')?.text ?? '',
      updatedAt: new Date(posts.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    };
  });

  return {
    props: {
      posts
    }
  }
}
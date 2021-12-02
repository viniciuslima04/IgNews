import Prismic from '@prismicio/client'
import { GetStaticProps } from 'next';
import { RichText } from 'prismic-dom'

export function getPrismicClient(req?: unknown) {
  const prismic = Prismic.client(
    process.env.PRISMIC_ENDPOINT,

    {
      req,
      accessToken: process.env.PRISMIC_ACCESS_TOKEN
    }
  )

  return prismic;
}

// export const getStaticProps: GetStaticProps = async () => { 
//   const prismic = getPrismicClient()

//   const response = await prismic.query([
//     Prismic.Predicates.at('document.type', 'publication')
//   ], { 
//     fetch: ['publication.title' , 'publication.content'],
//     pagesize: 100,
//   })

//   const posts = response.results.map(posts => {
//     return {
//       slug: posts.uid,
//       title: RichText.asText(posts.data.title),
//       excerpt: posts.data.content.find(content => content.type === 'paragraph')?.text ?? '',
//       updatedAt: new Date(posts.last_publication_date).toLocaleDateString('pt-BR', {
//         day: '2-digit',
//         month: 'long',
//         year: 'numeric',
//       })
//     };
//   });

//   return  {
//     props : {
//       posts
//     }
//   }
// }
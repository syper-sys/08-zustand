import type { Metadata } from 'next';
import { fetchNotes } from '@/lib/api';
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import NotesClient from './Notes.client';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const rawTag = slug?.[0];
  const tag = rawTag === 'all' ? undefined : rawTag;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', tag, 1, ''],
    queryFn: () => fetchNotes({ tag, page: 1, search: '' }),
  });

  return {
    title: `Note: ${tag}`,
    description: `Search with filter ${tag}`,
  }
}

const NotesByCategory = async ({ params }: Props) => {
  const { slug } = await params;
  const rawTag = slug?.[0];
  const tag = rawTag === 'all' ? undefined : rawTag;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', tag, 1, ''],
    queryFn: () => fetchNotes({ tag, page: 1, search: '' }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
};

export default NotesByCategory;
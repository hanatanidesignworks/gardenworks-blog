import { supabase } from '@/lib/supabaseClient';
import { notFound } from 'next/navigation';
import Link from 'next/link';

type Props = {
    params: {
        id: string;
    };
};

export default async function PostDetail({ params }: Props) {
    const { data: post, error} = await supabase
        .from('posts')
        .select('*')
        .eq('id', params.id)
        .single();

    if (!post || error) {
        return notFound();
    }

    return(
        <main className='p-4'>
            <h1 className='text-2xl font-bold mb-2'>{post.title}</h1>
            <img
                src={post.image_url}
                alt={post.title ?? 'image'}
                className='mb-4 max-h-[420px] w-full object-cover'
            />
            <p className='whitespace-pre-wrap leading-relaxed'>
                {post.content}
            </p>
            <p className='text-sm text-gray-500 mt-4'>投稿日: {post.created_at}</p>
            <div>
                <Link href="/">一覧に戻る</Link>
            </div>
        </main>
    );
}

export async function generateStaticParams() {
    const { data: posts } = await supabase.from('posts').select('id');

    return (posts ?? []).map((post) => (
        {id: post.id.toString(),}
    ));
}
export const revalidate = 60;

import Hero from '@/components/Hero';
import Header from '@/components/Header';
import FirstView from '@/components/FirstView';
import { supabase } from '@/lib/supabaseClient';

export default async function Home() {
  const { data: posts, error} = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false});

    if (error) {
        return <div>データ取得エラー: {String(error.message)}</div>
    }

  return (
      <main>
        <Header />
        <FirstView />
        <Hero posts={posts}/>
      </main>
  );
}

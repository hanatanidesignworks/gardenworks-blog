'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import ImageUploader from '@/components/ImageUploader';
import { useRouter } from 'next/navigation';

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState<string>('');
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        setLoading(true);
        const { error, data } = await supabase
            .from('posts')
            .insert([{ title, content, image_url: imageUrl }])
            .select('id')
            .single();

        setLoading(false);

        if (error)
             alert('保存エラー: ' + error.message);
        else router.push(`/`);
    };

    return (
        <div className='space-y-4'>
            <h1 className='text-2xl font-bold'>新規投稿</h1>
            <input 
                type="text"
                placeholder="タイトル"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='border p-2 w-full'
            />

            <textarea
                className='h-48 w-full rounded border p-e'
                placeholder='本文（プレーンテキスト）'
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            <ImageUploader onUploaded={(url) => setImageUrl(url)} />

            <button 
                onClick={handleSave}
                disabled={loading}
                className='bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50'
            >
                {loading ? '保存中...' : '保存'}
            </button>

            // 例：一時ボタン
            <button
            type="button"
            onClick={async () => {
                const { data: { user }, error } = await supabase.auth.getUser();
                alert(user ? `ログイン中：${user.email}` : '未ログイン');
                console.log('getUser ->', { user, error });
            }}
            >
            ログインチェック
            </button>

        </div>
    );
}
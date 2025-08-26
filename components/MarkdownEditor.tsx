'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';

export default function MarkdownEditor({
    value,
    onChange,
}: { value: string; onChange: (v: string) => void}) {
    const [tab, setTAb] = useState<'edit' | 'preview'>('edit');

    return(
        <div className='border rounded'>
            <div className='flex gap-2 border-b p-2'>
                <button className={tab==='edit'?'font-bold':''} onClick={() => setTAb('edit')}>編集</button>
                <button className={tab==='preview'?'font-bold':''} onClick={() => setTAb('preview')}>プレビュー</button>
            </div>
        {tab === 'edit' ? (
            <textarea
                className='w-full h-64 p-2 outline-none'
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={`# 見出し\n**太字**、[リンク](https://example.com) など`}
            />
        ) :(
            <div className='prose max-w-none p-4'>
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>
                    {value || '_(まだ本文がありません) _'}
                </ReactMarkdown>
            </div>
        )}
        </div>
    );
}
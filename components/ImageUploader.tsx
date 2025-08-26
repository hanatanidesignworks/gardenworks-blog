'use client';

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Props = {
    onUploaded: (url: string) => void;
};

export default function ImageUploader({ onUploaded }: Props) {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    function onPick(e: React.ChangeEvent<HTMLInputElement>) {
        const f = e.target.files?.[0] ?? null;
        if (!f) return;
        if (!f.type.startsWith('image/')) {
            alert('画像ファイルを選んでください');
            return;
        }
        setFile(f);
        setPreview(URL.createObjectURL(f));
    }

    async function upload() {
        if (!file) return;
        setLoading(true);

        const path = `public/${new Date().toISOString().slice(0,7)}/${Date.now()}_${file.name}`;

        const { error: upErr } = await supabase.storage
            .from('post-images')
            .upload(path, file, {
                cacheControl: '3600',
                upsert: false,
                contentType: file.type,
            });
        
        if (upErr) {
            setLoading(false);
            alert('アップロード失敗：' + upErr.message);
            return;
        }

        const { data } = supabase.storage.from('post-images').getPublicUrl(path);
        const url = data.publicUrl;

        setLoading(false);
        onUploaded(url);
    }

    return(
        <div className="space-y-3">
            <input type="file" accept="image/*" onChange={onPick} />
            {preview && (
                <div className="rounded border p-2">
                    <img src={preview} alt="preview" className="max-h-48 object-contain" />
                </div>
            )}
            <button
                onClick={upload}
                disabled={!file || loading}
                className="rounded bg-blue-600 px-3 py-1.5 text-white disabled:opacity-50"
            >
                {loading ? 'アップロード中...' : 'アップロード'}
            </button>
        </div>
    );
}
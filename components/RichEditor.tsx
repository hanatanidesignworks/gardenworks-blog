'use client';

import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

type Props = {
    value: string;
    onChange: (value: string) => void;
};

const ReactQuill = dynamic(() => import('react-quill'), {ssr: false});

export default function RichEditor({ value, onChange }: Props){
    return <ReactQuill theme="snow" value={value} onChange={onChange} />;
}
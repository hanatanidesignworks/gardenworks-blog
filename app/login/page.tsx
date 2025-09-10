import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState<string|null>(null);
    const router = useRouter();
    const sp = useSearchParams();
    const redirect = sp.get('redirect') || '/';

    async function handleSignIn(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true); setMsg(null);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        setLoading(false);
        if (error) return setMsg(error.message);
        router.replace(redirect);
    }

    return(
        <form onSubmit={handleSignIn} className='max-w-md mx-auto p-5 space-y-3'>
            <h1 className='text-2xl font-bold'>ログイン</h1>
            <input className='w-full border rouded p-2' type="email" value={email}
                    onChange={e=>setEmail(e.target.value)} placeholder='email' required />
            <input className='w-full border rounded p-2' type="password" value={password}
                    onChange={e=>setPassword(e.target.value)} placeholder='password' required />
            <button className='w-full px-4 py-2 rounded bg-black text-white' disabled={loading}>
                {loading ? 'ログイン中...' : 'ログイン'}
            </button>
            {msg && <p className='text-sm text-red-600'>{msg}</p>}
        </form> 
    );
}
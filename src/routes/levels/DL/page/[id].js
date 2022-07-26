import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

export async function GET({ params }) {
    const supabase = createClient(import.meta.env.VITE_API_URL, import.meta.env.VITE_API_KEY);
    var { data, error } = await supabase
        .from('levels')
        .select('*')
        .order('dlTop', { ascending: true })
        .range((params.id - 1) * 200, params.id * 200 - 1)
        .not("dlTop", 'is', null)
    console.log(error)
    return {
        status: 200,
        headers: {
            'access-control-allow-origin': '*'
        },
        body: data

    };
}
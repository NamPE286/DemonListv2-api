import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

export async function GET({params}) {
    const supabase = createClient(import.meta.env.VITE_API_URL, import.meta.env.VITE_API_KEY);
    const { data, error } = await supabase
        .from('players')
        .select('*')
        .eq('uid', params.id)
    return {
        status: 200,
        headers: {
            'access-control-allow-origin': '*'
        },
        body: data[0]
    };

}
import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

export async function GET({params}) {
    const supabase = createClient(import.meta.env.VITE_API_URL, import.meta.env.VITE_API_KEY);
    var { data, error } = await supabase
        .from('submissions')
        .select('*, levels(name)')
        .eq('userid', params.id)
        .order("id", {ascending: false})
    console.log(params, error)
    return {
        status: 200,
        headers: {
            'access-control-allow-origin': '*'
        },
        body: data
    };

}
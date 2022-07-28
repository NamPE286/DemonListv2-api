import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

export async function GET({params}) {
    const supabase = createClient(import.meta.env.VITE_API_URL, import.meta.env.VITE_API_KEY);
    const d = {
        data:{},
        records:[]
    }
    var { data, error } = await supabase
        .from('levels')
        .select('*')
        .eq('id', params.id)
    d.data = data[0]
    var { data, error } = await supabase
        .from('records')
        .select('*, players(name)')
        .eq('levelid', params.id)
    d.records = data
    return {
        status: 200,
        headers: {
            'access-control-allow-origin': '*'
        },
        body: d
    };

}
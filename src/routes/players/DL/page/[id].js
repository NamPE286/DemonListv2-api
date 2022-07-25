import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

export async function GET({params}) {
    const supabase = createClient(import.meta.env.VITE_API_URL, import.meta.env.VITE_API_KEY);
    const { data, error } = await supabase
        .from('players')
        .select('*')
        .order('dlrank', {ascending: true})
        .range((params.id - 1) * 200, params.id * 200 - 1)
        .not("dlTop", 'is', null)
    for(const i in data){
        if(data[i].dlrank == null) {
            delete data[i]
        }
    }
    console.log(error)
    return {
        status: 200,
        headers: {
            'access-control-allow-origin': '*'
        },
        body: data
    };
}
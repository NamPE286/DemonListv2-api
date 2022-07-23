import { createClient } from '@supabase/supabase-js'
import AES from 'crypto-js/aes'
import 'dotenv/config'

export async function GET({params}) {
    const supabase = createClient(import.meta.env.VITE_API_URL, import.meta.env.VITE_API_KEY);
    const { data, error } = await supabase
        .from('players')
        .select('*')
        .eq('id', params.id)
    var a = AES.encrypt(data[0].email, data[0].password).toString()
    data[0].email = a
    delete data[0].password
    //var b = AES.decrypt(a, 'a')
    //console.log(enc.stringify(b))
    return {
        status: 200,
        headers: {
            'access-control-allow-origin': '*'
        },
        body: data[0]
    };

}
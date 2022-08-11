import { createClient } from '@supabase/supabase-js'
import autocorrect from 'autocorrect'
import 'dotenv/config'

export async function GET({ params }) {
    const supabase = createClient(import.meta.env.VITE_API_URL, import.meta.env.VITE_API_KEY);
    //autocorrect all word in params.id
    var id = params.id.split(' ')
    for (var i = 0; i < id.length; i++) {
        id[i] = autocorrect()(id[i])
    }
    id = id.join(' ')
    if (isNaN(params.id)) {
        var d = []
        var m = {}
        var { data, error } = await supabase
            .from('levels')
            .select('*')
            .textSearch('name', `'${params.id}'`, {
                type: 'websearch',
                config: 'english'
            })
        for (var i = 0; i < data.length; i++) {
            m[data[i].id] = data[i]
        }
        var { data, error } = await supabase
            .from('levels')
            .select('*')
            .textSearch('name', `'${id}'`, {
                type: 'websearch',
                config: 'english'
            })
        for (var i = 0; i < data.length; i++) {
            m[data[i].id] = data[i]
        }
        var { data, error } = await supabase
            .from('players')
            .select('name, uid')
            .textSearch('name', `'${params.id}'`, {
                type: 'websearch',
                config: 'english'
            })
        var players = []
        for (var i = 0; i < data.length; i++) {
            players.push({
                id: data[i].uid,
                name: data[i].name
            })
        }
        console.log(data, error)
        var list = []
        for(const i in m){
            list.push(m[i])
        }
        return {
            status: 200,
            headers: {
                'access-control-allow-origin': '*'
            },
            body: [list, players]
        };
    }
    else {
        var { data, error } = await supabase
            .from('levels')
            .select('*')
            .eq('id', params.id)
        return {
            status: 200,
            headers: {
                'access-control-allow-origin': '*'
            },
            body: data,
        };
    }


}
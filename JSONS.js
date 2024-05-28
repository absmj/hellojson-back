import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://trdfnzlpkjvuxflfkjga.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyZGZuemxwa2p2dXhmbGZramdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY4Njg5MDksImV4cCI6MjAzMjQ0NDkwOX0.2OT-5MDxObncd48zVQF6rqAzREOOErDvbouCLlrlQcQ');

class JSONS {
    constructor() {
        this.table = 'jsons';
        // console.log(supabase)
    }

    async insert(data) {
        const { data: insertData, error } = await supabase
            .from(this.table)
            .insert([data]);
        if (error) throw error;
    }

    async getById(id) {
        const { data, error } = await supabase
            .from(this.table)
            .select('*')
            .eq('uuid', id)
            .single();
        return data;
    }

    async getByUId(uuid) {
        const { data, error } = await supabase
            .from(this.table)
            .select('*')
            .eq('uuid', uuid)
            .single();
        return data;
    }

    async getAll() {
        const { data, error } = await supabase
            .from(this.table)
            .select('*');
        return data;
    }

    async update(uuid, data) {
        const { data: updateData, error } = await supabase
            .from(this.table)
            .update(data)
            .eq('uuid', uuid);
        if (error) throw error;
        return updateData;
    }

    async delete(id) {
        const { data, error } = await supabase
            .from(this.table)
            .delete()
            .eq('id', id);
        if (error) throw error;
        return data;
    }
}

export default JSONS;

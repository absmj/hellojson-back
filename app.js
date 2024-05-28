import express from 'express';
import { createClient } from '@supabase/supabase-js'
import morgan from 'morgan'
import bodyParser from "body-parser";

const app = express();


// using morgan for logs
app.use(morgan('combined'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


const supabaseUrl = 'https://trdfnzlpkjvuxflfkjga.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyZGZuemxwa2p2dXhmbGZramdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY4Njg5MDksImV4cCI6MjAzMjQ0NDkwOX0.2OT-5MDxObncd48zVQF6rqAzREOOErDvbouCLlrlQcQ'
const supabase = createClient(supabaseUrl, supabaseKey)

app.get('/', async (req, res) => {
    const {data, error} = await supabase
        .from('jsons')
        .select()
    res.send(data);
});


app.listen(3000, () => {
    console.log(`> Ready on http://localhost:3000`);
});
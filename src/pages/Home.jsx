import md5 from 'js-md5';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Home() {

    const [data, setData] = useState(null);
    const [search, setSearch] = useState('');

    const fetchData = async () => {
        try {
            const ts = new Date().getTime();
            const publicKey = import.meta.env.VITE_PUBLIC_KEY;
            const privateKey = import.meta.env.VITE_PRIVATE_KEY;
            const hash = md5(`${ts}${privateKey}${publicKey}`);

            const response = await fetch(`https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
            const jsonData = await response.json();
            setData(jsonData);
            console.log(jsonData);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        console.log(search);
    }

    return (
        <div>
            <h1 className='text-red-500 font-bold text-4xl tracking-tighter'>PRUEBA TÉCNICA - SITENSO</h1>
            <input type='text' placeholder='Buscar personaje' className='border border-slate-400 rounded-md p-2' onChange={handleSearchChange} />
            <div className='flex  flex-row flex-wrap gap-4'>
                {
                    data && data.data.results.map((characters) => {
                        return (
                            <Link to={`/character/${characters.id}`} key={characters.id} className='flex flex-col max-w-md items-center p-4 bg-slate-100 rounded-lg border border-slate-400'>
                                <img className='h-60 w-fit rounded-md' src={`${characters.thumbnail.path}.${characters.thumbnail.extension}`} alt={characters.name} />
                                <h2 className='text-lg font-bold'>{characters.name}</h2>
                                <p className='text-sm text-left text-slate-500'>{characters.description}</p>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home
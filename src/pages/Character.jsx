import md5 from 'js-md5';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { IoIosWarning } from "react-icons/io";

function Character() {

    const [data, setData] = useState(null);
    const { id } = useParams();

    const fetchData = async () => {
        try {
            const ts = new Date().getTime();
            const publicKey = import.meta.env.VITE_PUBLIC_KEY;
            const privateKey = import.meta.env.VITE_PRIVATE_KEY;
            const hash = md5(`${ts}${privateKey}${publicKey}`);

            const response = await fetch(`https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=${publicKey}&ts=${ts}&hash=${hash}`);
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

    return (
        <div>
            <h1 className='text-4xl font-bold tracking-tight'>{data?.data?.results[0]?.name}</h1>
            <div>
                {
                    data && data.data.results.map((character) => {
                        return (
                            <div key={character.id} className='flex flex-col'>
                                <img className='h-60 w-fit rounded-md' src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} />

                                <p className=' my-2 rounded-md w-fit text-left text-slate-500'>{character.description === '' ? <p className='px-3 py-1 bg-yellow-300 text-yellow-700 flex gap-2 items-center rounded-md'><IoIosWarning /> This character has no description</p> : character.description}</p>
                            </div>
                        )

                    })
                }
            </div>
        </div>
    )
}

export default Character
import {useEffect, useState} from "react";
import List from "./List";
import useDebounce from "./hooks";
import './style.css';

const apuURL = "http://localhost:8080/api/items";

export default function AutocompleteInput() {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [query, debouncedQuery, setQuery] = useDebounce("", 500);

    useEffect(() => {
        if (debouncedQuery) {
            setIsLoading(true);
            fetch(`${apuURL}?q=${debouncedQuery}`)
                .then(response => response.json())
                .then(responseJSON => {
                    if (!responseJSON || responseJSON.error) {
                        throw new Error(responseJSON.error);
                    }
                    setItems(responseJSON);
                })
                .catch(e => console.log("Error:", e))
                .finally(() => setIsLoading(false));
        } else {
            setItems([]);
        }
    }, [debouncedQuery]);

    const handleChange = e => setQuery(e.target.value);


    return (
        <div className='wrapper'>
            <div className={`control ${isLoading ? 'is-loading' : ''}`}>
                <input className='input' type='text' value={query} onChange={handleChange}/>
            </div>
            {!!items.length && <List items={items}/>}
        </div>
    );
}
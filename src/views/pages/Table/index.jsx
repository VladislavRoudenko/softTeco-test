import './style.css';
import {useEffect, useState} from "react";

const apuURL = "http://localhost:8080/api/users";
const itemsPerPage = 10;

function Table() {

    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPageNumber, setTotalPageNumber] = useState(0);

    useEffect(() => {
        fetch(`${apuURL}?page=${page}`)
            .then(response => response.json())
            .then(responseJSON => {
                if (!responseJSON || responseJSON.error) {
                    throw new Error(responseJSON.error);
                }
                const {count, results} = responseJSON;
                setUsers(results);
                setTotalPageNumber(Math.ceil(count / itemsPerPage));
            })
            .catch(e => console.log("Error:", e))
    }, [page]);

    const handleSwitchFirstPage = number => setPage(1);
    const handleSwitchPrevPage = number => setPage(page - 1);
    const handleSwitchNextPage = number => setPage(page + 1);
    const handleSwitchLastPage = number => setPage(Math.floor(totalPageNumber));

    if (!users.length) {
        return (<h1>There's nothing to show...</h1>)
    }
    return (
        <section className='table-section'>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                {users.map(({id, firstName, lastName}) => (
                    <tr key={id}>
                        <td>{id}</td>
                        <td>{firstName}</td>
                        <td>{lastName}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <section className='pagination'>
                <button onClick={handleSwitchFirstPage} className='first-page-btn' disabled={page === 1}>1</button>
                <button onClick={handleSwitchPrevPage} className='previous-page-btn'
                        disabled={page === 1}>{'<'}</button>
                <button onClick={handleSwitchNextPage} className='next-page-btn'
                        disabled={page === totalPageNumber}>{'>'}</button>
                <button onClick={handleSwitchLastPage} className='last-page-btn'
                        disabled={page === totalPageNumber}>{totalPageNumber}</button>
            </section>
        </section>
    );
}

export default Table;

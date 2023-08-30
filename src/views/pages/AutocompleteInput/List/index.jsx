export default function List({items}) {

    const onSelectItem = (item) => {};

    return (
        <div className='list'>
            {items.map((item, idx) => (
                <a key={idx} className='list-item' onClick={() => onSelectItem(item)}>{item}</a>
            ))}
        </div>
    )
}
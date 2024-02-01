import { useState, useEffect }  from 'react'

const ItemsList = () => {
    const [items, setItems] = useState([]);             // State to store the items
    const [isLoading, setIsLoading] = useState(true);   // State to handle loading status
    const [error, setError] = useState(null);           // State to handle any errors

    // Function to fetch items from the API
    const fetchItems = async () => {
        try {
            const response = await fetch('http://localhost:5000/items');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setItems(data); // Update the state with the fetched items data into the items array
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    // useEffect คือ React Hook ที่จะทำงานอัตโนมัติเมื่อ Component ถูก Render และ Re-render
    useEffect(() => {
        fetchItems();
    }, []);


  return (
        <div>
            <h1>Items List</h1>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.ID}>
                            <td>{item.ID}</td>
                            <td>{item.Name}</td>
                            <td>{item.Price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
  )
}

export default ItemsList
import './Surfcard.css';

export default function Surfcard ({title, description, id}) {

    const handleDelete = async () => {
        // TODO: popup modal with info to update
    }
    const handleUpdate = async () => {
        // TODO: confirm deletion protocal
    }

    return (
        <>
            <div className="cardDiv">
                <button onClick={handleDelete}>trash</button>
                <h4>{title}</h4>
                <p>{description}</p>
                <button onClick={handleUpdate}>update</button>
            </div>
        </>
    );
}
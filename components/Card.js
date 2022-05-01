export default function Card({image, name}){
    return(
    <div className="card bg-white rounded-lg p-4 text-center drop-shadow-md">
        <img className="card-image rounded-lg object-fill w-full " src={image} alt={name} />
        <h2 className="card-text font-bold text-lg uppercase my-4">{name}</h2>
    </div>
    )
}
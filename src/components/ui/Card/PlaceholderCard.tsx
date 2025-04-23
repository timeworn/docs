import "./Card.css"

interface PlaceholderCardProps {
    title: string;
}

const PlaceholderCard: React.FC<PlaceholderCardProps> = ({ title }) => {
    return (
        <div className="card bg-base-100 shadow-sm ">
            <div className="card-body text-center flex flex-col justify-center">
                <h3 className="text-2xl">{title}</h3>
            </div>
        </div>
    )
}

export default PlaceholderCard;
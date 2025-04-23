import Link from "next/link";
import "./Card.css"
import Image from "next/image";

interface ServiceCardProps {
    title: string;
    description: string;
    image?: string;
    alt: string;
    link?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, image, alt, link }) => {
    return (
        <div className="card bg-base-100 shadow-sm hover:scale-105 hover:bg-base-300 transition-all duration-300 ease-in-out relative group">
            {link && (
                <Link className="absolute -inset-0" href={link} />
            )}
            {image && (
                <figure className="pt-5">
                    <Image
                        src={image}
                        alt={alt}
                        width={128}
                        height={128} />
                </figure>
            )}
            <div className="card-body text-center">
                <h3 className="text-2xl">{title}</h3>
                <p className="text-base text-ellipsis">{description}</p>
            </div>
        </div>
    )
}

export default ServiceCard;
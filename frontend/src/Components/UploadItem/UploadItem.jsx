const UploadItem = ({ id, name, description, image }) => {
    return (
        <div className="w-[350px]">
            <div>
                <img 
                    src={image} 
                    alt={name} 
                    className="w-full h-[480px] object-cover border border-gray-300 rounded-2xl overflow-hidden shadow-lg"
                />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold">{name}</h3>
                <p className="text-gray-600">{description}</p>
            </div>
        </div>
    );
};

export default UploadItem;

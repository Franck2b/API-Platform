interface RecommendationCardProps {
  image: string;
  title: string;
  rating: number;
  price: string;
  description: string;
}

export default function RecommendationCard({ 
  image, 
  title, 
  rating, 
  price, 
  description 
}: RecommendationCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
      <div 
        className="h-80 bg-cover bg-center"
        style={{ backgroundImage: `url('${image}')` }}
      ></div>
      <div className="p-4 shadow-md">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900 text-lg">{title}</h3>
          <div className="flex items-center gap-1">
            <span className="text-yellow-400">⭐</span>
            <span className="font-normal text-gray-900 text-lg">{rating}</span>
          </div>
        </div>
        <p className="text-sm text-gray-400 mb-6">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-gray-900">$ {price}</p>
          <button className="bg-[#FC3C5F] hover:bg-[#e23252] text-white font-normal px-6 py-2 rounded-full text-sm transition-all active:scale-95">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}


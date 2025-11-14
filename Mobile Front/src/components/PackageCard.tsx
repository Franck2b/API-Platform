interface PackageCardProps {
  image: string;
  title: string;
  duration: string;
}

export default function PackageCard({ image, title, duration }: PackageCardProps) {
  return (
    <div className="relative rounded-2xl overflow-hidden h-75 shadow-lg">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${image}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
      </div>
      <div className="absolute bottom-4 left-4 right-4">
        <h3 className="text-white font-bold text-lg mb-1">{title}</h3>
        <p className="text-white/90 text-xs">{duration}</p>
      </div>
    </div>
  );
}


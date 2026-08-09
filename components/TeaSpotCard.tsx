import Image from 'next/image';

interface TeaSpot {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
}

interface Props {
  spot: TeaSpot;
}

export default function TeaSpotCard({ spot }: Props) {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white/5 p-4 backdrop-blur-lg transition-shadow hover:shadow-xl">
      <div className="relative h-48 w-full rounded-md">
        <Image
          src={spot.imageUrl}
          alt={spot.name}
          layout="fill"
          objectFit="cover"
          className="duration-300 group-hover:scale-105"
        />
      </div>
      <h2 className="mt-4 text-xl font-semibold text-white">{spot.name}</h2>
      <p className="mt-2 line-clamp-2 text-sm text-slate-300">{spot.description}</p>
    </div>
  );
}

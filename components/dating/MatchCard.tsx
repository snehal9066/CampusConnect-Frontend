import Image from 'next/image';
import { motion } from 'framer-motion';
import VerifiedBadge from './VerifiedBadge';

interface MatchCardProps {
  user: {
    username: string;
    profileImage?: string;
    verified: boolean;
    // Additional fields can be added as needed
  };
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  isMutual?: boolean; // if true, show full avatar, else blurred
}

export default function MatchCard({
  user,
  onSwipeLeft,
  onSwipeRight,
  isMutual = false,
}: MatchCardProps) {
  const handleDragEnd = (
    _: any,
    info: { offset: { x: number } }
  ) => {
    const swipeThreshold = 150; // pixels
    if (info.offset.x > swipeThreshold && onSwipeRight) {
      onSwipeRight();
    } else if (info.offset.x < -swipeThreshold && onSwipeLeft) {
      onSwipeLeft();
    }
  };

  return (
    <motion.div
      className="relative w-80 max-w-full p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-lg mb-6"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Avatar */}
      <div className="flex flex-col items-center">
        <div className="relative">
          <Image
            src={user.profileImage || '/images/boy_silhouette.jpg'}
            alt={user.username}
            width={200}
            height={200}
            className={`rounded-full border-4 border-white object-cover transition-all duration-300 ${
              isMutual ? '' : 'blur-sm'
            }`}
          />
          {user.verified && <VerifiedBadge />}
        </div>
        <h3 className="mt-4 text-xl font-semibold text-white">
          {user.username}
        </h3>
      </div>
    </motion.div>
  );
}

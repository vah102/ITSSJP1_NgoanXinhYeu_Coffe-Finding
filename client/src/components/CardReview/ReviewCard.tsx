import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ReviewCardProps = {
  item: {
    avatar: string;
    username: string;
    time: string;
    rate: number;
    comment: string;
    image: string;
  };
};

function ReviewCard({ item }: ReviewCardProps) {
  const formattedTime = new Date(item.time).toLocaleDateString("en-GB");
  return (
    <div>
      {/* User Info */}
      <div className="flex items-center py-6">
        <img
          src={item.avatar}
          alt="user avatar"
          className="w-20 h-20 rounded-full mr-4"
        />
        <div>
          <h3 className="text-2xl font-semibold pb-2">{item.username}</h3>
          <p className="text-xl text-gray-500">{formattedTime}</p>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, index) => (
          <FontAwesomeIcon
            key={index}
            icon={faStarSolid}
            className={
              index < Math.floor(item.rate)
                ? "text-yellow-400"
                : "text-gray-300"
            }
          />
        ))}
      </div>

      {/* Comment */}
      <p className="text-2xl text-black mb-4">{item.comment}</p>

      {/* Images */}
      {item.image && (
        <div className="mb-4">
          <img
            src={item.image}
            alt="Review Image"
            className="w-60 h-60 object-cover rounded-lg"
          />
        </div>
      )}
    </div>
  );
}

export default ReviewCard;

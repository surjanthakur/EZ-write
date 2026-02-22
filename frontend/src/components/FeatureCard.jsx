
const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-[#0f0f11] border border-neutral-800 rounded-2xl p-8 max-w-md transition hover:border-neutral-700">
      {/* Icon */}
      <div className="mb-6 text-neutral-400">
        {icon}
      </div>
      {/* Title */}
      <h3 className="text-2xl font-semibold text-white mb-4">
        {title}
      </h3>
      {/* Description */}
      <p className="text-neutral-400 leading-relaxed text-base">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
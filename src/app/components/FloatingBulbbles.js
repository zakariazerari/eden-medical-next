export default function FloatingBubbles() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute bg-violet-300 rounded-full opacity-30"
          style={{
            width: `${20 + Math.random() * 60}px`,
            height: `${20 + Math.random() * 60}px`,
            bottom: `-${Math.random() * 100}px`,
            left: `${Math.random() * 100}%`,
            animation: `floatUp ${15 + Math.random() * 1}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          30% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-150vh);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

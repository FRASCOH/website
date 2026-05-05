import './Marquee.css';

const Marquee = () => {
  const items = [
    "CYBERSECURITY",
    "IT PROJECT MANAGEMENT",
    "NIS2",
    "GDPR",
    "ISO 27001",
    "AGILE",
    "PENETRATION TESTING"
  ];

  // We duplicate the items to create a seamless infinite loop
  const marqueeItems = [...items, ...items, ...items];

  return (
    <div className="marquee-container">
      <div className="marquee-track">
        {marqueeItems.map((item, index) => (
          <div key={index} className="marquee-item">
            <span className="marquee-text">{item}</span>
            <span className="marquee-separator">•</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;

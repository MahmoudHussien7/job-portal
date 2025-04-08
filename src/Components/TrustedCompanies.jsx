export default function TrustedCompanies() {
  const logos = [
    { name: "Microsoft", src: "/microsoft-logo.png" },
    { name: "Walmart", src: "/walmart-logo.png" },
    { name: "Accenture", src: "/accenture-logo.png" },
  ];
  return (
    <div className="bg-white py-4 px-6 shadow flex justify-center gap-6 items-center">
      {logos.map((logo) => (
        <img key={logo.name} src={logo.src} alt={logo.name} className="h-8" />
      ))}
    </div>
  );
}

import Image from 'next/image';

const CompaniesBanner = () => {
  const companies = [
    { name: 'MIT', logo: '/MIT.png' },
    { name: 'Citadel', logo: '/citadel.png' },
    { name: 'dYdX', logo: '/dydx.png' },
    { name: 'Blur', logo: '/blur.png' },
    { name: 'OpenAI', logo: '/openAI.png' },
  ];

  return (
    <div className="flex flex-col w-full items-center justify-center my-20 text-white">
      <h2 className="text-[26px] mb-10 font-degular font-semibold tracking-[-0.28px]">
        BUILT BY TEAM MEMBERS FROM
      </h2>

      <div className="flex flex-row justify-between items-center w-full h-10 px-36">
        {companies.map((company) => (
          <div key={company.name} className="flex h-full items-center justify-center">
            <Image
              src={company.logo}
              alt={`${company.name} logo`}
              width={120}
              height={55}
              className={`h-[100%] w-auto`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompaniesBanner;

import Image from 'next/image';


const SearchHero = () => {
    return (
      <section className="relative h-[0vh] md:h-[25vh]">
        <div className="absolute z-10 w-full bg-gradient-to-b from-transparent-black to-transparent h-28" />
        <Image
          src="/assets/hero.jpg"
          alt='hero image'
          fill
          style= {{ objectFit:'cover' , objectPosition:'center bottom' }}
          placeholder="blur"
          blurDataURL="/assets/hero.jpg"
          quality={50}
        />
        </section>
    );
  };
  
  export default SearchHero;
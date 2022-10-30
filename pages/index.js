
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Banner, CreatorCard } from '../components';

import images from '../assets';
import { makeId } from '../utils/makeid';

const Home = () => {
  const { theme } = useTheme();
  const parentRef = useRef(null);
  const scrollRef = useRef(null);
  const [hideButton, setHideButton] = useState(false);

  const handleScorll = (direction) => {
    const { current } = scrollRef;

    const scrollAmount = window.innerWidth > 1800 ? 270 : 210;

    if (direction === 'left') {
      current.scrollLeft -= scrollAmount;
    } else {
      current.scrollLeft += scrollAmount;
    }
  };

  const isScorllable = () => {
    const { current } = scrollRef;
    const { current: parent } = parentRef;

    if (current?.scrollWidth >= parent?.offsetWidth) {
      setHideButton(false);
    } else {
      setHideButton(true);
    }
  };

  useEffect(() => {
    isScorllable();
    window.addEventListener('resize', isScorllable);

    return () => {
      window.removeEventListener('resize', isScorllable);
    };
  });

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-full minmd:w-4/5">
        <Banner
          banner="Discover, collect and sell extraordinary NFTs"
          childStyles="md:text-4xl sm:text-2xl text-left"
          parentStyles="justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
        />

        <div>
          <h1 className="dark:text-white text-nft-black-1 font-poppins text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">Top Creators</h1>

          <div className="relative flex-1 max-w-full flex mt-3" ref={parentRef}>
            <div className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none" ref={scrollRef}>
              {[4, 5, 6, 7, 8, 9].map((i) => (
                <CreatorCard
                  key={`creator-${i}`}
                  rank={i}
                  creatorImage={images[`creator${i}`]}
                  creatorName={`0x${makeId(3)}...${makeId(3)}`}
                  creatorEth={10 - i * 0.5}
                />
              ))}
              {!hideButton && (
              <>
                <div onClick={() => handleScorll('left')} className="absolute w-8 h-8 minld:w-12 minlg:h-12 top-45 cursor-pointer left-0">
                  <Image
                    src={images.left}
                    layout="fill"
                    objectFit="contain"
                    alt="left_arrow"
                    className={`${theme === 'light' ? 'filter invert' : ''} `}
                  />
                </div>
                <div onClick={() => handleScorll('right')} className="absolute w-8 h-8 minld:w-12 minlg:h-12 top-45 cursor-pointer right-0">
                  <Image
                    src={images.right}
                    layout="fill"
                    objectFit="contain"
                    alt="left_arrow"
                    className={`${theme === 'light' ? 'filter invert' : ''} `}
                  />
                </div>
              </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10" />

      </div>
    </div>
  );
};

export default Home;

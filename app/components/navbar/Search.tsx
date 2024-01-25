"use client";

import { BiSearch } from "react-icons/bi";

const Search = () => {
  return (
    <div
      className="
        border-[1px]
        w-full
        md:w-auto
        py-2
        rounded-full
        shadow-sm
        hover:shadow-md
        transition
        cursor-pointer
      "
    >
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold px-6">Anywhere</div>
        <div className="pl-6 pr-2 border-l-[1px] flex flex-row items-center gap-3">
          <div className="hidden sm:block text-sm font-semibold">Any Time</div>
          <div className="p-2 rounded-full text-white bg-black">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;

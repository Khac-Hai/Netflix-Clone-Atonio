import { signOut } from 'next-auth/react';
import React from 'react';

import useCurrentUser from '@/hooks/useCurrentUser';

interface BellIconMenuProps {
  visible?: boolean;
  className?: string; 
}

const BellIconMenu: React.FC<BellIconMenuProps> = ({ visible }) => {
  const { data} = useCurrentUser();

  if (!visible) {
    return null;
  }

  return (
    <div className="bg-black w-80 absolute top-16 right-20 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-3">
        <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
          <img className="w-28 rounded-md" src="/images/poster.png" alt="" />
          <p className="px-3 text-center text-white hover:underline"> Ra Mắt 11/10/2024</p>
        </div>
      </div>
      <hr className="bg-gray-600 border-0 h-px my-4" />
      <div className="flex flex-col gap-3">
        <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
          <img className="w-28 rounded-md" src="/images/thumbnail.jpg" alt="" />
          <p className="px-3 text-center text-white hover:underline"> Nội Dung Mới</p>
        </div>
      </div>
      <hr className="bg-gray-600 border-0 h-px my-4" />
      <div className="flex flex-col gap-3">
        <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
          <img className="w-28 rounded-md" src="/images/cover.jpg" alt="" />
          <p className="px-3 text-center text-white hover:underline"> Đã Đến Lúc Xem Lại</p>
        </div>
      </div>
    </div>
  )
  
}
export default BellIconMenu;

'use client';

import { usePathname, useSearchParams } from "next/navigation";
import { TbBuildingStore, TbCar, TbCarrot } from "react-icons/tb";
import CategoryBox from "../CategoryBox";
import Container from "../Container";

export const categories =[
  {
    label: 'Beauty',
    icon: TbBuildingStore,
    description: 'Here you can get beauty service'
  },
  {
    label: 'Groceries',
    icon: TbCarrot,
    description: 'Here you can get groceries'
  },
  {
    label: 'Cars',
    icon: TbCar,
    description: 'Here you can get car service'
  },
]

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathName = usePathname();

  const isMainPage = pathName === '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          pt-4
          flex
          flex-row
          items-center
          justify-between
          overflow-x-auto
        "
      >
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={category === item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
}
 
export default Categories;
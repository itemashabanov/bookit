import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    category,
    location,
    imageSrc,
    price,
    title,
    description,
    workersCount,
  } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const listing = await prisma.listing.create({
    data: {
      category,
      locationValue: location.value,
      imageSrc,
      price: parseInt(price, 10),
      title,
      description,
      workersCount,
      userId: currentUser.id,
    }
  });

  return NextResponse.json(listing);
}
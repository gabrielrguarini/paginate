import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const take = url.searchParams.get("take");
    const lastCursor = url.searchParams.get("lastCursor");

    const result = await prisma.products.findMany({
      take: take ? parseInt(take) : 10,
      ...(lastCursor && {
        skip: 1,
        cursor: {
          id: Number(lastCursor),
        },
      }),
    });

    if (result.length === 0) {
      return NextResponse.json(
        {
          data: [],
          metadata: {
            lastCursor: null,
            hasNextPage: false,
          },
        },
        {
          status: 200,
        }
      );
    }

    const lastProduct = result[result.length - 1];
    const cursor = lastProduct.id;

    const nextPage = await prisma.products.findMany({
      take: take ? parseInt(take) : 10,
      skip: 1,
      cursor: {
        id: cursor,
      },
    });

    return NextResponse.json(
      {
        data: result,
        metadata: {
          lastCursor: cursor,
          hasNextPage: nextPage.length > 0,
        },
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

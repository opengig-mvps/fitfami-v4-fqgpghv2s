import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export async function POST(
  request: Request,
  { params }: { params: { recipeId: string } }
) {
  try {
    const session: any = await getServerSession(request as any);
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const userId = session?.user?.id;
    const recipeId = parseInt(params?.recipeId, 10);
    if (isNaN(recipeId)) {
      return NextResponse.json({ success: false, message: 'Invalid recipe ID' }, { status: 400 });
    }

    const recipe = await prisma.recipe.findFirst({
      where: { id: recipeId },
    });

    if (!recipe) {
      return NextResponse.json({ success: false, message: 'Recipe not found' }, { status: 404 });
    }

    const like = await prisma.like.create({
      data: {
        userId: parseInt(userId, 10),
        recipeId,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Like added successfully',
      data: like,
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error adding like:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}
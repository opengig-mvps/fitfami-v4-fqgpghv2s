import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';

type CommentRequestBody = {
  content: string;
};

export async function POST(
  request: Request,
  { params }: { params: { recipeId: string } }
) {
  try {
    const session: any = await getServerSession({ req: request } as any);
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const userId = session?.user?.id;
    const recipeId = parseInt(params?.recipeId, 10);
    if (isNaN(recipeId)) {
      return NextResponse.json({ success: false, message: 'Invalid recipe ID' }, { status: 400 });
    }

    const body: CommentRequestBody = await request.json();
    const { content } = body;
    if (!content) {
      return NextResponse.json({ success: false, message: 'Content is required' }, { status: 400 });
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        userId,
        recipeId,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Comment added successfully',
      data: {
        commentId: comment?.id?.toString(),
        content: comment?.content,
        createdAt: comment?.createdAt?.toISOString(),
        updatedAt: comment?.updatedAt?.toISOString(),
      },
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error adding comment:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}

export async function GET(
  request: Request,
  { params }: { params: { recipeId: string } }
) {
  try {
    const recipeId = parseInt(params?.recipeId, 10);
    if (isNaN(recipeId)) {
      return NextResponse.json({ success: false, message: 'Invalid recipe ID' }, { status: 400 });
    }

    const comments = await prisma.comment.findMany({
      where: { recipeId },
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    const formattedComments = comments?.map((comment: any) => ({
      commentId: comment?.id?.toString(),
      content: comment?.content,
      createdAt: comment?.createdAt?.toISOString(),
      updatedAt: comment?.updatedAt?.toISOString(),
      user: {
        userId: comment?.user?.id?.toString(),
        username: comment?.user?.username,
      },
    }));

    return NextResponse.json({
      success: true,
      message: 'Comments fetched successfully',
      data: formattedComments,
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}
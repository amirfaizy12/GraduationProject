import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { generateSlug } from '../utils/slug';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
import { verifyToken } from '../utils/jwt';
import path from 'path';
import fs from 'fs';

export const createPortfolio = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId!;

    const existingPortfolio = await prisma.portfolio.findUnique({ where: { userId } });
    if (existingPortfolio) {
      res.status(400).json({ message: 'Portfolio already exists for this user.' });
      return;
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }

    const slug = await generateSlug(user.name);

    const portfolio = await prisma.portfolio.create({
      data: {
        userId,
        slug,
      },
    });

    res.status(201).json(portfolio);
  } catch (error) {
    console.error('Create portfolio error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export const getPortfolio = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId!;
    const { id } = req.params;

    const portfolio = await prisma.portfolio.findUnique({ where: { id: id as string } });

    if (!portfolio) {
      res.status(404).json({ message: 'Portfolio not found.' });
      return;
    }

    if (portfolio.userId !== userId) {
      res.status(403).json({ message: 'Forbidden.' });
      return;
    }

    res.status(200).json(portfolio);
  } catch (error) {
    console.error('Get portfolio error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export const updatePortfolio = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId!;
    const { id } = req.params;
    const updateData = req.body;

    const portfolio = await prisma.portfolio.findUnique({ where: { id: id as string } });

    if (!portfolio) {
      res.status(404).json({ message: 'Portfolio not found.' });
      return;
    }

    if (portfolio.userId !== userId) {
      res.status(403).json({ message: 'Forbidden.' });
      return;
    }

    // Prevent changing critical fields directly via generic update
    delete updateData.id;
    delete updateData.userId;
    delete updateData.slug;
    delete updateData.viewCount;

    const updatedPortfolio = await prisma.portfolio.update({
      where: { id: id as string },
      data: updateData,
    });

    res.status(200).json(updatedPortfolio);
  } catch (error) {
    console.error('Update portfolio error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export const publishPortfolio = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId!;
    const { id } = req.params;

    const portfolio = await prisma.portfolio.findUnique({
      where: { id: id as string },
      include: { user: true },
    });

    if (!portfolio) {
      res.status(404).json({ message: 'Portfolio not found.' });
      return;
    }

    if (portfolio.userId !== userId) {
      res.status(403).json({ message: 'Forbidden.' });
      return;
    }

    let slug = portfolio.slug;
    if (!slug) {
      slug = await generateSlug(portfolio.user.name);
    }

    const updatedPortfolio = await prisma.portfolio.update({
      where: { id: id as string },
      data: {
        isPublic: true,
        slug,
      },
    });

    res.status(200).json({
      message: 'Portfolio published successfully.',
      publicUrl: `${process.env.CLIENT_URL || 'http://localhost:5173'}/${slug}`,
      slug,
      portfolio: updatedPortfolio,
    });
  } catch (error) {
    console.error('Publish portfolio error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export const unpublishPortfolio = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId!;
    const { id } = req.params;

    const portfolio = await prisma.portfolio.findUnique({ where: { id: id as string } });

    if (!portfolio) {
      res.status(404).json({ message: 'Portfolio not found.' });
      return;
    }

    if (portfolio.userId !== userId) {
      res.status(403).json({ message: 'Forbidden.' });
      return;
    }

    const updatedPortfolio = await prisma.portfolio.update({
      where: { id: id as string },
      data: { isPublic: false },
    });

    res.status(200).json({
      message: 'Portfolio unpublished successfully.',
      portfolio: updatedPortfolio,
    });
  } catch (error) {
    console.error('Unpublish portfolio error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export const deletePortfolio = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId!;
    const { id } = req.params;

    const portfolio = await prisma.portfolio.findUnique({ where: { id: id as string } });

    if (!portfolio) {
      res.status(404).json({ message: 'Portfolio not found.' });
      return;
    }

    if (portfolio.userId !== userId) {
      res.status(403).json({ message: 'Forbidden.' });
      return;
    }

    await prisma.portfolio.delete({ where: { id: id as string } });

    res.status(200).json({ message: 'Portfolio deleted successfully.' });
  } catch (error) {
    console.error('Delete portfolio error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export const getPortfolioBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    // req.userId may be undefined here because this is a public route, 
    // but if the authMiddleware is applied loosely (not strict), or we manually check token,
    // let's assume we can optionally have req.userId.
    // The requirement says: If private and requester isn't owner, return 404.
    const token = req.cookies.accessToken;
    let userId: string | undefined;
    
    if (token) {
      const decoded = verifyToken(token);
      if (decoded) {
        userId = decoded.userId;
      }
    }

    const portfolio = await prisma.portfolio.findUnique({
      where: { slug: slug as string },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (!portfolio) {
      res.status(404).json({ message: 'Portfolio not found.' });
      return;
    }

    const isOwner = userId === portfolio.userId;

    if (!portfolio.isPublic && !isOwner) {
      res.status(404).json({ message: 'Portfolio not found.' });
      return;
    }

    if (!isOwner) {
      // Increment viewCount for non-owners
      await prisma.portfolio.update({
        where: { id: portfolio.id },
        data: { viewCount: { increment: 1 } },
      });
      portfolio.viewCount += 1;
    }

    res.status(200).json(portfolio);
  } catch (error) {
    console.error('Get portfolio by slug error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export const downloadCv = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId!;
    const { id } = req.params;
    const portfolio = await prisma.portfolio.findUnique({ where: { id: id as string } });

    if (!portfolio) {
      res.status(404).json({ message: 'Portfolio not found.' });
      return;
    }

    if (portfolio.userId !== userId) {
      res.status(403).json({ message: 'Forbidden.' });
      return;
    }

    // Assuming personalInfo has { cvFilename: '...' }
    const personalInfo = portfolio.personalInfo as any;
    if (!personalInfo || !personalInfo.cvFilename) {
      res.status(404).json({ message: 'CV not found for this portfolio.' });
      return;
    }
    const uploadDir = process.env.UPLOAD_DIR || 'uploads';
    const filePath = path.join(process.cwd(), uploadDir, personalInfo.cvFilename);

    if (!fs.existsSync(filePath)) {
      res.status(404).json({ message: 'CV file not found on disk.' });
      return;
    }

    res.download(filePath, personalInfo.cvFilename);
  } catch (error) {
    console.error('Download CV error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

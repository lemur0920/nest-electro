import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.req.dto';
import { ReviewResponseDto } from './dto/review.res.dto';
import { plainToInstance } from 'class-transformer';
import { CustomException, EXCEPTION_STATUS } from 'src/common/exceptions/custom-exception';

@Injectable()
export class ReviewService {
  private readonly logger = new Logger(ReviewService.name);
  constructor(private readonly prisma: PrismaService) {};
  
  async createReview(
    createReviewDto: CreateReviewDto,
    productId: number, 
    userId: number
  ):Promise<ReviewResponseDto> {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
      select: { categoryId: true }, //categoryId만 조회
    });

    const review = await this.prisma.review.create({
      data: {
        userId: userId,
        productId: productId,
        categoryId: product.categoryId,
        rating: createReviewDto.rating,
        content: createReviewDto.content
      },
    });
    return review;
  }

  async findAll(): Promise<ReviewResponseDto[]> {
    const reviews = await this.prisma.review.findMany({
      select: {
        userId: true,
        productId: true,
        categoryId: true,
        rating: true,
        content: true,
        createdAt: true,
        updatedAt: true
      },
    });
    
    return plainToInstance(ReviewResponseDto, reviews);
  }

  async findByUerId(
    userId: number
  ): Promise<ReviewResponseDto[]> {
    const reviews = await this.prisma.review.findMany({
      where: { userId: userId },
    });

    return plainToInstance(ReviewResponseDto, reviews)
  }

  async deleteByUserId(
    reviewId: number
  ): Promise<void> {
    const review = await this.prisma.review.findUnique({
      where: { id: reviewId },
    });

    if (!review) {
      throw new CustomException(EXCEPTION_STATUS.REVIEW.NOT_FOUND);
    }
    await this.prisma.review.delete({
      where: { id: reviewId },
    });
  }
  
}

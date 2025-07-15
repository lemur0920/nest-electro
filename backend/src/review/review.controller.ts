import { Body, Controller, Delete, Get, Logger, Param, Post, Session } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.req.dto';
import { CustomException, EXCEPTION_STATUS } from 'src/common/exceptions/custom-exception';
import { ResponseDto } from 'src/common/dto/response.dto';
import { ReviewResponseDto } from './dto/review.res.dto';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';

@ApiTags('reviews') // Swagger 태그
@Controller('reviews')
export class ReviewController {
  private readonly logger = new Logger(ReviewController.name);
  constructor(private readonly reviewService: ReviewService) {};

  @ApiOperation({ summary: '리뷰 등록' })
  @Serialize(ReviewResponseDto)
  @Post(':productId')
  async createReview(
    @Body() createReviewDto: CreateReviewDto,
    @Param('productId') productId: number,
    @Session() session: Record<string, any>
  ) {
    const userId = session.userId;
    if (!userId) {
      throw new CustomException(EXCEPTION_STATUS.AUTH.UNAUTHENTICATED);
    }
    const newReview = this.reviewService.createReview(createReviewDto, productId, userId);
    return ResponseDto.success({
      message: '리뷰 생성 성공',
      data: newReview,
    });
  }
  
  @ApiOperation({ summary: '전체 리뷰 조회' })
  @Serialize(ReviewResponseDto)
  @Get()
  async findAll(): Promise<ResponseDto<ReviewResponseDto[]>> {
    const reviews = await this.reviewService.findAll();
    return ResponseDto.success({ message: '전체 리뷰 조회 성공', data: reviews });
  }

  @ApiOperation({ summary: '유저 전체 리뷰 조회' })
  @Serialize(ReviewResponseDto)
  @Get()
  async findByUser(
    @Session() session: Record<string, any>
  ): Promise<ResponseDto<ReviewResponseDto[]>> {
    const userId = session.userId;

    if (!userId) {
      throw new CustomException(EXCEPTION_STATUS.AUTH.UNAUTHENTICATED);
    }
    const reviews = await this.reviewService.findByUerId(userId);
    return ResponseDto.success({
      message: '유저 전체 리뷰 조회 성공',
      data: reviews
    })
  }

  @ApiOperation({ summary: '유저 리뷰 단일 삭제' })
  @Serialize(ReviewResponseDto)
  @Delete('/:reviewId')
  async deleteByUserId(
    @Session() session: Record<string, any>,
    @Param('reviewId') reviewId: number
  ): Promise<ResponseDto<void>> {
    const userId = session.userId;
    if (!userId) {
      throw new CustomException(EXCEPTION_STATUS.AUTH.UNAUTHENTICATED);
    }
    const reviews = await this.reviewService.deleteByUserId(reviewId)
    return ResponseDto.success({ message: '리뷰 삭제 완료'});
  }
}

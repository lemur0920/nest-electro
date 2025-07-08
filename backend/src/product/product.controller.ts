import { Body, Controller, Delete, Get, Logger, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';
import { ProductResponseDto } from './dto/product.res.dto';
import { ResponseDto } from 'src/common/dto/response.dto';
import { CreateProductDto } from './dto/create-product.req.dto';
import { ProductService } from './product.service';
import { UpdateProductDto } from './dto/update-product.req.dto';

@ApiTags('products')
@Controller('product')
export class ProductController {
  private readonly logger = new Logger(ProductController.name);
  constructor(private readonly productService: ProductService) {};

  @ApiOperation({ summary: '제품 등록' })
  @Serialize(ProductResponseDto)
  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto
  ): Promise<ResponseDto<ProductResponseDto>> {
    const newProduct = await this.productService.createProduct(createProductDto);
    return ResponseDto.success({
      message: '제품 등록에 성공하였습니다.', 
      data: newProduct
    });
  }

  @ApiOperation({ summary: '제품 수정' })
  @Serialize(ProductResponseDto)
  @Patch(':productId')
  async updateProduct(
    @Param('productId') productId: number,
    @Body() updateProductDto: UpdateProductDto 
  ): Promise<ResponseDto<ProductResponseDto>> {
    const updatedProduct = await this.productService.updateProduct(productId, updateProductDto);

    return ResponseDto.success({
      message: '제품 수정에 성공하였습니다.',
      data: updatedProduct
    })
  }

  @ApiOperation({ summary: '제품 조회' })
  @Serialize(ProductResponseDto)
  @Get(':productId')
  async getProductById(@Param('productId') productId: number): Promise<ResponseDto<ProductResponseDto>> {
    const product = await this.productService.getProductById(productId);

    return ResponseDto.success({
      message: '제품 조회에 성공하였습니다.',
      data: product
    });
  }

  @ApiOperation({ summary: '제품 삭제' })
  @Delete(':productId')
  async deleteProductById(@Param('productId') productId: number): Promise<ResponseDto<void>> {
    await this.productService.deleteProduct(productId);
    return ResponseDto.success({
      message: '제품 삭제에 성공하였습니다.',
    })
  }
}

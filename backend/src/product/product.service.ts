import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.req.dto';
import { Product } from '@prisma/client';
import { ProductResponseDto } from './dto/product.res.dto';
import { UpdateProductDto } from './dto/update-product.req.dto';
import { CustomException, EXCEPTION_STATUS } from 'src/common/exceptions/custom-exception';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);
  constructor(private prisma: PrismaService){};
  
  async createProduct(createProductDto: CreateProductDto): Promise<ProductResponseDto> {
    const { categoryId, releasedAt, ...rest } = createProductDto;
    const newProduct = await this.prisma.product.create({
      data: {
        ...rest,
        category: { connect: { id: categoryId } },
        releasedAt: releasedAt ? new Date(releasedAt) : null,
      },
    });
    return newProduct;
  }

  async updateProduct(productId, updateProductDto: UpdateProductDto): Promise<ProductResponseDto> {
    const product = await this.getProductById(productId);

    const updatedProduct = await this.prisma.product.update({
      where: { id: productId },
      data: updateProductDto
    });
    return updatedProduct;
  }

  async getProductById(productId): Promise<ProductResponseDto> {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      throw new CustomException(EXCEPTION_STATUS.PRODUCT.NOT_FOUND);
    }
    return product
  }

  async deleteProduct(productId): Promise<void> {
    const product = await this.getProductById(productId);

    if(!product) {
      throw new CustomException(EXCEPTION_STATUS.PRODUCT.NOT_FOUND);
    }

    await this.prisma.product.delete({
    where: { id: productId }
    });
  }
}

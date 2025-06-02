import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { Product } from 'src/product/entities/product.entity';
import { CartItem } from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem)
    private cartRepo: Repository<CartItem>,
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  async addToCart(dto: AddToCartDto) {
    const product = await this.productRepo.findOneBy({ id: dto.productId });
    if (!product) throw new NotFoundException('Product not found');

    const cartItem = this.cartRepo.create({ product, quantity: dto.quantity });
    return this.cartRepo.save(cartItem);
  }

  findAll() {
    return this.cartRepo.find();
  }

  updateQuantity(id: number, quantity: number) {
    return this.cartRepo.update(id, { quantity });
  }

  removeItem(id: number) {
    return this.cartRepo.delete(id);
  }

  clearCart() {
    return this.cartRepo.clear();
  }
}

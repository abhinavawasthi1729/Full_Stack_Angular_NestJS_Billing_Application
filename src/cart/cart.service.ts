import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { Product } from 'src/product/entities/product.entity';
import { CartItem } from './entities/cart-item.entity';

@Injectable()
export class CartService implements OnModuleInit{
  constructor(
    @InjectRepository(CartItem)
    private readonly cartRepo: Repository<CartItem>,

    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async onModuleInit() {
    await this.clearCart();
    console.log('Cart cleared on app startup');
  }

  async clearCart() {
    await this.cartRepo.clear();
    return { message: 'Cart cleared' };
  }

//   async addToCart(dto: AddToCartDto) {
//     const product = await this.productRepo.findOneBy({ id: dto.productId });

//     if (!product) {
//       throw new NotFoundException(`Product with ID ${dto.productId} not found`);
//     }

//     const cartItem = this.cartRepo.create({
//       product,
//       quantity: dto.quantity,
//     });

//     return this.cartRepo.save(cartItem);
//   }

  async findAll() {
    return this.cartRepo.find({
    });
  }

//   // async updateQuantity(id: number, quantity: number) {
//   //   const result = await this.cartRepo.update(id, { quantity });
//       relations: ['product'], // Ensure product details are included

//   //   if (result.affected === 0) {
//   //     throw new NotFoundException(`Cart item with ID ${id} not found`);
//   //   }

//   //   return this.cartRepo.findOne({ where: { id }, relations: ['product'] });
//   // }

// async updateProductQuantity(cartItemId: number, productId: number, quantity: number) {
//   const item = await this.cartRepo.findOne({
//     where: {
//       id: cartItemId,
//       product: { id: productId }
//     },
//     relations: ['product']
//   });

//   if (!item) {
//     throw new NotFoundException('Cart item not found');
//   }

//   item.quantity = quantity;
//   return this.cartRepo.save(item);
// }

async addOrUpdate(dto: AddToCartDto) {
  const product = await this.productRepo.findOneBy({ id: dto.productId });
  if (!product) throw new NotFoundException('Product not found');

  const existingItem = await this.cartRepo.findOne({
    where: { product: { id: dto.productId } },
    relations: ['product'],
  });

  if (existingItem) {
    existingItem.quantity += dto.quantity;
    return this.cartRepo.save(existingItem);
  }

  const newItem = this.cartRepo.create({
    product,
    quantity: dto.quantity,
  });

  return this.cartRepo.save(newItem);
}



  async removeItem(id: number) {
    const result = await this.cartRepo.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Cart item with ID ${id} not found`);
    }

    return { message: `Item ${id} removed from cart` };
  }

  // async clearCart() {
  //   await this.cartRepo.clear();
  //   return { message: 'Cart cleared' };
  // }
}

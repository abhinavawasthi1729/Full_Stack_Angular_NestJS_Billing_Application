import { Controller, Post, Body, Get, Param, Delete, Put } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  addToCart(@Body() dto: AddToCartDto) {
    return this.cartService.addToCart(dto);
  }

  @Get()
  getCart() {
    return this.cartService.findAll();
  }

  @Put(':id')
  updateItem(@Param('id') id: string, @Body() dto: UpdateCartItemDto) {
    return this.cartService.updateQuantity(+id, dto.quantity);
  }

  @Delete(':id')
  removeItem(@Param('id') id: string) {
    return this.cartService.removeItem(+id);
  }

  @Delete()
  clearCart() {
    return this.cartService.clearCart();
  }
}

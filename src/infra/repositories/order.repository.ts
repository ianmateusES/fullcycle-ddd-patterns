import { Order, OrderItem } from "../../domain/checkout/entities";
import { OrderRepositoryInterface } from "../../domain/checkout/repositories";
import { OrderModel, OrderItemModel } from "../db/sequelize/model";

export class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    const transaction = await OrderModel.sequelize.transaction();
    try {
      await OrderModel.update(
        {
          customer_id: entity.customerId,
          total: entity.total(),
        },
        {
          where: { id: entity.id },
          transaction,
        }
      );

      await OrderItemModel.destroy({
        where: { order_id: entity.id },
        transaction,
      });

      for (const item of entity.items) {
        await OrderItemModel.create(
          {
            id: item.id,
            name: item.name,
            price: item.price,
            product_id: item.productId,
            quantity: item.quantity,
            order_id: entity.id,
          },
          { transaction }
        );
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async findById(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({
      where: { id },
      include: [{ model: OrderItemModel }],
    });

    return Order.create(
      orderModel.id,
      orderModel.customer_id,
      orderModel.items.map((item) =>
        OrderItem.create(item.id, item.name, item.price, item.product_id, item.quantity)
      )
    );
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({
      include: [{ model: OrderItemModel }],
    });

    return orderModels.map((orderModel) =>
      Order.create(
        orderModel.id,
        orderModel.customer_id,
        orderModel.items.map((item) =>
          OrderItem.create(item.id, item.name, item.price, item.product_id, item.quantity)
        )
      )
    );
  }
}

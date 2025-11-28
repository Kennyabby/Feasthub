import React, { createContext, useContext, useState } from 'react';

export type Order = {
  id: string;
  items: any[];
  total: number;
  customer: {
    name: string;
    phone: string;
    address: string;
  };
  status: 'received' | 'preparing' | 'delivering' | 'delivered';
  createdAt: Date;
  estimatedDelivery: Date;
};

type OrderContextType = {
  currentOrder: Order | null;
  placeOrder: (order: Order) => void;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  const placeOrder = (order: Order) => {
    setCurrentOrder(order);
    // In a real app, we might save to localStorage here for persistence across reloads
    // localStorage.setItem('lastOrder', JSON.stringify(order));
  };

  return (
    <OrderContext.Provider value={{ currentOrder, placeOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrder must be used within an OrderProvider');
  return context;
};

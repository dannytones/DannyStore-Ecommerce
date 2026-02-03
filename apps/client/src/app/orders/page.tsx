import { auth } from "@clerk/nextjs/server";
import { OrderType } from "@repo/types";

const fetchOrders = async () => {
  const { getToken } = await auth();
  const token = await getToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ORDER_SERVICE_URL}/user-orders`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const data: OrderType[] = await res.json();
  return data;
};

const OrdersPage = async () => {
  const orders = await fetchOrders();

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-neutral-500 font-light ">
        <p>Your archive is currently empty</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-12  selection:bg-neutral-200 text-neutral-900">
      {/* Концентрований Header */}
      <header className="mb-2 md:mb-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-1 h-1 bg-neutral-900" />
          <span className="text-xs font-medium uppercase tracking-widest text-neutral-500">
            Internal / Logs
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-light tracking-tight ">
          Purchases
        </h1>
      </header>

      {/* Список замовлень — Air Minimal Compact */}
      <div className="flex flex-col">
        {orders.map((order) => (
          <div
            key={order._id}
            className="group flex flex-col md:flex-row md:items-baseline md:justify-between py-8 md:py-10 border-t border-neutral-300 first:border-t-0 transition-colors duration-300"
          >
            {/* Основна інфо: Дата + Товари */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3 text-xs font-mono text-neutral-500 uppercase tracking-tighter">
                <span>
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString("en-GB")
                    : "Date N/A"}
                </span>
                <span className="opacity-30">/</span>
                <span className="group-hover:text-neutral-900 transition-colors">
                  #{order._id.slice(-6).toUpperCase()}
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-normal tracking-tight max-w-2xl leading-tight">
                {order.products?.map((p) => p.name).join(", ") ||
                  "Untitled product"}
              </h3>

              <div className="pt-1">
                <span className="text-[10px] md:text-xs font-medium uppercase tracking-widest text-neutral-400 ">
                  Status: {order.status}
                </span>
              </div>
            </div>

            {/* Ціна — тепер збалансована */}
            <div className="mt-4 md:mt-0 md:text-right">
              <p className="text-2xl md:text-3xl font-light tracking-tighter text-neutral-800 ">
                ${(order.amount / 100).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;

import Link from "next/link";

const ReturnPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ session_id: string }> | undefined;
}) => {
  const session_id = (await searchParams)?.session_id;

  if (!session_id) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="max-w-md w-full p-8 rounded-3xl bg-neutral-50 border border-neutral-200 text-center">
          <p className="text-sm font-medium text-neutral-500">
            Session reference missing
          </p>
        </div>
      </div>
    );
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/sessions/${session_id}`,
  );
  const data = await res.json();

  const isSuccess = data.status === "complete" || data.status === "succeeded";

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 animate-in fade-in duration-1000">
      <div className="max-w-sm w-full space-y-12 text-center">
        {/* М'яка іконка статусу */}
        <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 bg-neutral-100 rounded-[3rem] rotate-12 animate-pulse" />
          <div className="relative w-20 h-20 bg-white border border-neutral-200 rounded-[2.5rem] flex items-center justify-center shadow-sm">
            {isSuccess ? (
              <svg
                className="w-8 h-8 text-neutral-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <span className="text-2xl font-light">?</span>
            )}
          </div>
        </div>

        {/* Текстовий блок */}
        <div className="space-y-3">
          <h1 className="text-3xl font-light tracking-tight">
            {isSuccess ? "Thank you" : "Payment " + data.status}
          </h1>
          <p className="text-sm text-neutral-500 font-medium leading-relaxed">
            {isSuccess ? "Your order was successfull " : "Please wait..."}
          </p>
        </div>

        {/* Контейнер з деталями (М'які кути) */}
        <div className="p-6 rounded-[2rem] bg-neutral-50/50 border border-neutral-100 space-y-2 text-left">
          <div className="flex justify-between text-[10px] uppercase tracking-widest text-neutral-500">
            <span>Status</span>
            <span className="text-neutral-900 font-bold">
              {data.paymentStatus}
            </span>
          </div>
          <div className="flex justify-between text-[10px] uppercase tracking-widest text-neutral-500">
            <span>Session ID</span>
            <span className="truncate ml-4">{session_id.slice(-12)}</span>
          </div>
        </div>

        {/* Кнопка повернення */}
        <div className="pt-4">
          <Link
            href="/orders"
            className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-neutral-900 text-white text-xs font-medium uppercase tracking-[0.2em] hover:bg-neutral-800 hover:scale-[1.02] transition-all duration-300 shadow-xl shadow-neutral-200"
          >
            See your orders
          </Link>
        </div>
      </div>

      <footer className="absolute bottom-12 text-[10px] uppercase tracking-[0.4em] text-neutral-500">
        Transaction_Finalized
      </footer>
    </div>
  );
};

export default ReturnPage;

const RecentOrdersCard = () => {
  const orders = [
    {
      product: 'Macbook pro 13"',
      variants: '2 Variants',
      category: 'Laptop',
      price: '$2399.00',
      status: 'Delivered',
      image: '/src/images/product/product-01.jpg',
    },
    {
      product: 'Apple Watch Ultra',
      variants: '1 Variants',
      category: 'Watch',
      price: '$879.00',
      status: 'Pending',
      image: '/src/images/product/product-02.jpg',
    },
    {
      product: 'iPhone 15 Pro Max',
      variants: '2 Variants',
      category: 'SmartPhone',
      price: '$1869.00',
      status: 'Delivered',
      image: '/src/images/product/product-03.jpg',
    },
    {
      product: 'iPad Pro 3rd Gen',
      variants: '2 Variants',
      category: 'Electronics',
      price: '$1699.00',
      status: 'Canceled',
      image: '/src/images/product/product-04.jpg',
    },
    {
      product: 'Airpods Pro 2nd Gen',
      variants: '1 Variants',
      category: 'Accessories',
      price: '$240.00',
      status: 'Delivered',
      image: '/src/images/product/product-05.jpg',
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'Canceled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
    }
  }

  return (
    <div className="col-span-12">
      <div className="rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-black dark:text-white">Recent Orders</h3>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700">
              <i className="fa-solid fa-filter"></i>
              Filter
            </button>
            <button className="px-3 py-2 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400">
              See all
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">Products</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">Category</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">Price</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                        <i className="fa-solid fa-image text-gray-400"></i>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-black dark:text-white">{order.product}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{order.variants}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-sm text-gray-700 dark:text-gray-300">{order.category}</p>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-sm font-medium text-black dark:text-white">{order.price}</p>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default RecentOrdersCard


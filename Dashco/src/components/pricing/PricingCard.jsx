const PricingCard = ({ name, price, features, isPopular = false, icon }) => {
  return (
    <div className="col-lg-3 col-md-6 col-sm-12">
      <div className={`card pricing2 ${isPopular ? 'border-primary border-2' : ''}`}>
        <div className="body">
          <div className="pricing-plan">
            {icon && (
              <div className="pricing-img mb-6 flex justify-center">
                <i className={`${icon} text-6xl ${isPopular ? 'text-primary' : 'text-gray-400'}`}></i>
              </div>
            )}
            <h2 className="pricing-header text-gray-700 font-semibold tracking-wide mb-4">{name}</h2>
            <ul className="pricing-features list-unstyled m-0 p-0 my-12 leading-8 tracking-wide">
              {features.map((feature, index) => (
                <li key={index} className="text-gray-600">{feature}</li>
              ))}
            </ul>
            <span className="pricing-price block text-3xl font-bold text-gray-800 mb-4">
              {price}
            </span>
            <button className={`btn w-full ${isPopular ? 'btn-primary' : 'btn-outline-primary'}`}>
              {isPopular ? 'Get Started' : 'Choose Plan'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PricingCard


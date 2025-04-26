import { useState } from 'react';
import '../index.css';
import purifierImage1 from '../assets/images/purifier/purifier1.webp';
import purifierImage2 from '../assets/images/purifier/purifier2.webp';
import purifierImage3 from '../assets/images/purifier/purifier3.webp';
import purifierImage4 from '../assets/images/purifier/purifier4.webp';

import mask_n95 from '../assets/images/masks/mask_n95.webp';
import mask_n99 from '../assets/images/masks/mask_n99.webp';
import mask_n100_dust from '../assets/images/masks/mask_n100_dust.webp';
import mask_n100 from '../assets/images/masks/mask_n100.webp';
import mask_p95_dust from '../assets/images/masks/mask_p95_dust.webp';
import mask_p95 from '../assets/images/masks/mask_p95.webp';
import surgical_n95 from '../assets/images/masks/surgical_n95.webp';
import xiaomi_mask from '../assets/images/masks/xiaomi_mask.jpg';



const SafetyMeasurement = () => {
    const [selectedTip, setSelectedTip] = useState(null);
    const [modalTop, setModalTop] = useState(0);

    // const tips = [
    //     { id: 2, title: "Use a High-Quality Air Purifier Indoors", content: "Contrary to popular belief, indoor air isn't always cleaner than outdoor air...", recommended: true },
    //     { id: 3, title: "Wear a Mask (But Not Just Any Mask)", content: "Gone are the days when masks were associated only with pandemics...", recommended: true },
    //     { id: 1, title: "Track Air Quality Daily", content: "The first step in tackling any problem is understanding its scope..." },

    //     { id: 4, title: "Green Up Your Space", content: "Nature is one of the best detoxifiers we have..." },

    //     { id: 5, title: "Limit Your Outdoor Exposure", content: "When pollution levels spike, it's best to stay indoors..." },

    //     { id: 6, title: "Ventilate Smartly", content: "Good ventilation is crucial for healthy indoor air..." },

    //     { id: 7, title: "Opt for Public Transport or Carpooling", content: "Reducing your own contribution to air pollution..." },

    //     { id: 8, title: "Boost Your Diet", content: "What you eat can impact how your body handles pollution..." },

    //     { id: 9, title: "Advocate for Cleaner Air", content: "Individual actions are powerful, but collective change..." },

    //     { id: 10, title: "Educate Your Community", content: "Sometimes, the simplest act of protection is spreading..." }
    // ];

    const tips = [
       
        
        { id: 2, title: "Use a High-Quality Air Purifier Indoors", content: "Many people assume indoor air is cleaner than outdoor air—but that’s not always true. Pollutants from dust, cooking, furniture, and vehicle exhaust can make their way inside your home. Invest in an air purifier with a HEPA filter, which removes up to 99.97% of airborne pollutants like PM 2.5 and allergens. Place purifiers in high-traffic areas like the bedroom and living room. If buying multiple purifiers isn’t feasible, create a “clean air zone” in your home using one purifier in a designated area." , recommended: true},
    
        { id: 3, title: "Wear a Mask (But Not Just Any Mask)", content: "On high-pollution days, a good-quality mask can significantly reduce the amount of harmful air you inhale. However, not all masks are effective against pollution. Use N95 or N99 masks, which filter out 95-99% of airborne pollutants, including PM 2.5 and PM 10. Make sure the mask fits snugly, covering your nose and mouth without leaving gaps. Avoid loose cloth masks—they provide little protection against fine pollutants." , recommended: true},
    
        { id: 1, title: "Track Air Quality Daily", content: "Air pollution levels change throughout the day, so it’s important to stay updated. Monitoring the Air Quality Index (AQI) can help you plan your outdoor activities. Use AQI tracking apps like AirVisual, AQI India, or the Central Pollution Control Board (CPCB) website for real-time updates. If the AQI is above 200 (poor or worse), limit outdoor activities, especially for children, the elderly, and those with respiratory conditions. Pay attention to pollution alerts during winter, when smog and fog trap pollutants closer to the ground." },
        
        { id: 4, title: "Green Up Your Space", content: "Plants not only beautify your home but also help absorb certain pollutants and improve air quality. Best indoor plants for cleaner air include Areca Palm (filters toxins like formaldehyde), Snake Plant (absorbs CO2 and pollutants even at night), and Peace Lily (reduces volatile organic compounds). If you have outdoor space: Plant trees or hedges to act as natural barriers against pollution." },
    
        { id: 5, title: "Limit Your Outdoor Exposure", content: "Pollution levels fluctuate during the day, with mornings and evenings being the worst due to temperature inversion and traffic emissions. Avoid outdoor activities during early mornings (before 10 AM) and late evenings (after 7 PM). The best time to go out? Midday or early afternoon, when sunlight disperses pollutants." },
    
        { id: 6, title: "Ventilate Smartly", content: "Good ventilation is crucial for indoor air quality, but timing is everything. Open windows when the outdoor AQI is lower (usually mid-morning or early afternoon). On high-pollution days, keep windows closed and rely on air purifiers. Use an exhaust fan while cooking to reduce indoor smoke and harmful gases." },
    
        { id: 7, title: "Opt for Public Transport or Carpooling", content: "Reducing vehicle emissions not only improves air quality but also helps with traffic congestion. Use public transport instead of driving alone. Carpool to reduce the number of vehicles on the road. For short distances, walk or cycle instead of driving. Vehicle emissions contribute significantly to PM 2.5 and nitrogen oxide levels, two of the most harmful pollutants." },
    
        { id: 8, title: "Boost Your Diet to Fight Pollution Effects", content: "Pollution causes oxidative stress, which can lead to lung and heart problems. A strong immune system can help counteract these effects. Foods that help combat pollution damage include antioxidant-rich foods like berries, nuts, spinach, and green tea. Omega-3 fatty acids (found in fish, walnuts, and flaxseeds) reduce inflammation in the lungs. Vitamin C & E from citrus fruits and almonds protect lung health. Staying hydrated helps flush out toxins from polluted air." },
    
        { id: 9, title: "Advocate for Cleaner Air", content: "Personal actions help, but real change comes from collective efforts and policy improvements. Support organizations that fight for stricter air quality regulations. Push for clean energy sources and better public transport in your city. Participate in local tree-planting or pollution awareness drives. India’s air quality standards are still not as strict as WHO guidelines. Advocating for change can help save thousands of lives." },
    
        { id: 10, title: "Educate Your Community", content: "Many people don’t realize the severity of air pollution and its health impacts. By spreading awareness, you can help others protect themselves. Share air pollution facts with your family and friends. Organize workshops or webinars about pollution and preventive measures. Encourage local businesses and schools to adopt cleaner practices." }
    ];
    

    const recommendations = {
        2: {
            products: [
                {
                    name: "3M Aura Particulate N95",
                    image: purifierImage1, link: "https://www.amazon.com/MORENTO-Purifiers-Airborne-Particles-Handheld/dp/B0D966KC7F"
                },

                {
                    name: "MORENTO Air Purifiers",
                    image: purifierImage2, link: "https://www.amazon.com/MORENTO-Purifiers-Airborne-Particles-Handheld/dp/B0DJNGDL3Y?th=1"
                },
                {
                    name: "Air Purifiers,Room Cover 2,100 Ft²",
                    image:purifierImage3, link: "https://www.amazon.com/Purifiers-Purifier-Quality-Monitor-Aromatherapy/dp/B0CY3GZ52B?th=1"
                },
                {
                    name: "H13 Hepa Double-Sided Air Filter",
                    image: purifierImage4, link: "https://www.amazon.com/Purifiers-Double-Sided-Purifier-Display-Quality/dp/B0CZRT3RKQ"
                },



            ]
        },

        3: {
            products: [
                { name: "N99 Pollution Mask", image: mask_n95, link: "https://www.amazon.com/Approved-Particulate-Respirators-Individually-Universal/dp/B09BN4YWFC/ref=sr_1_4?dib=eyJ2IjoiMSJ9.t_wmaA8QDYKXle82bVwrEhovwQ4DZKhvgjvj-d6fD4CSI35lckjECnC53o0d7iS2jTVvNQ3DxHJ1jsqAn3QhA6bFjOnlqX7FHtfBme9MzZnCsbQGK8JB0srn4LBuxIttFuKwwfvMToAPfuwkYNCsuXBC0T8rVosdl7OmZLQ-KuMgtverflT2GjdOvRMG4DgCJnhvFDZ2ovNOgWuIi1j3D7LhnvxlYZ8-HJp7J_y7PE3P2wCtPS8XEyH4gCDwZWRgbTH2dI_63GaAVZTx73rzo2hnnhkXcCJAGUj0RzEE5NRKNO95Zq38yM8Oa_IDpiYFXDgD77-qdvBwQeTiedmJJ7xh0zgTWR5Id0UDNKrFECx-4FBKTUZrD79pp-0uPOTGGpdHgusiDBWb4m5Scc5B2e6KyDbkKcMDCSgS9kd_2bUd2fm0q_-G7Lrh0WNFrqiS.gRaLrkJxZ1Lw6ZNZhZX9_7nRZWo89U7r72xK7COUHG0&dib_tag=se&keywords=n95%2Bmask&qid=1738404279&sr=8-4&th=1" },

                { name: "3M N95 Respirator 8511, Cool Flow Valve", image: mask_n99, link: "https://www.walmart.com/c/kp/n99-mask" },

                { name: "WAKYFLX Respirator Mask with 2097 Filters", image: mask_n100_dust, link: "https://www.walmart.com/search?q=mask+n100+dust" },

                { name: "3M 8233-N100 Particulate Respirator", image:mask_n100, link: "https://www.walmart.com/ip/3M-8233-N100-Particulate-Respirator/311271960?classType=REGULAR&from=/search" },

                { name: "3M N95 Respirator 8511, Cool Flow Valve, White", image: mask_p95_dust, link: "https://www.walmart.com/search?q=mask+p95+dust" },

                { name: "KN95 - 5 Layer Face Mask 50 pcs", image: mask_p95, link: "https://www.walmart.com/search?q=mask+p95+" },

                { name: "BYD Care Non-Medical Disposable N95 Respirator Face Masks", image: surgical_n95, link: "https://www.walmart.com/search?q=surgical+n95" },

                { name: "Surgical Black Face mask", image: xiaomi_mask, link: "https://www.gadstyle.com/item/15046/xiaomi-mijia-airpop-mask/" },

              


            ]
        }
    };

    const openModal = (tipId) => {
        setModalTop(window.scrollY + window.innerHeight / 2);
        setSelectedTip(tipId);
    };

    const closeModal = () => {
        setSelectedTip(null);
    };

    return (
        <div className="safety-container">
            <h1 className="safety-main-title">Simple Ways To Protect Yourself From Air Pollution</h1>

            {tips.map(tip => (
                <div key={tip.id} className="safety-tip-card">
                    <h2 className="safety-tip-title">{tip.title}</h2>
                    <p className="safety-tip-content">{tip.content}</p>
                    {tip.recommended && (
                        <button onClick={() => openModal(tip.id)} className="safety-recommended-button">
                            Recommended
                        </button>
                    )}
                </div>
            ))}

            {selectedTip && (
                <Modal
                    tipId={selectedTip}
                    recommendations={recommendations}  // 🔹 Pass recommendations as a prop
                    modalTop={modalTop}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

const Modal = ({ tipId, recommendations, modalTop, onClose }) => (
    <div className="safety-modal-overlay" style={{ top: `${modalTop}px` }}>
        <div className="safety-modal-content">
            <button className="safety-modal-close" onClick={onClose}>×</button>
            <h3>Recommended Products</h3>
            <div className="safety-products-grid">
                {recommendations[tipId]?.products?.map((product, index) => (  // 🔹 Safely access data
                    <div key={index} className="safety-product-card">
                        <img src={product.image} alt="product image" />
                        <p>{product.name}</p><br></br>
                        <a href={product.link} className="safety-product-link" target='_blank'>
                            View Product
                        </a>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default SafetyMeasurement;

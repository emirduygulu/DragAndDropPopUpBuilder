import { Link } from 'react-router-dom';
import Layout from '../../components/UI/Layout';

const TemplatesPage = () => {
  const templateCategories = [
    {
      id: 'popup',
      title: 'Popup Şablonları',
      description: 'E-posta toplama, promosyonlar, duyurular ve daha fazlası için ilgi çekici popup\'lar oluşturun.',
      image: 'https://via.placeholder.com/600x400/4F46E5/FFFFFF?text=Popup+Şablonları',
      count: 12,
    },
    {
      id: 'banner',
      title: 'Banner Şablonları',
      description: 'Web sitenizin başlığı, alt bilgisi veya herhangi bir bölümü için göz alıcı bannerlar tasarlayın.',
      image: 'https://via.placeholder.com/600x400/10B981/FFFFFF?text=Banner+Şablonları',
      count: 8,
    },
    {
      id: 'modal',
      title: 'Modal Şablonları',
      description: 'Önemli mesajlar ve etkileşimler için güzel modal diyaloglar oluşturun.',
      image: 'https://via.placeholder.com/600x400/F59E0B/FFFFFF?text=Modal+Şablonları',
      count: 6,
    },
    {
      id: 'notification',
      title: 'Bildirim Şablonları',
      description: 'Kullanıcı deneyimini bozmadan dikkat çeken ince bildirim öğeleri tasarlayın.',
      image: 'https://via.placeholder.com/600x400/EC4899/FFFFFF?text=Bildirim+Şablonları',
      count: 4,
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-[#0077b6] text-white py-16">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Şablon Galerisi</h1>
            <p className="text-xl opacity-90 mb-8">
              Profesyonel olarak tasarlanmış şablon koleksiyonumuza göz atın veya kendinizinkini sıfırdan oluşturun.
            </p>
          </div>
        </div>
      </section>

      {/* Template Categories */}
      <section className="py-16">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {templateCategories.map((category) => (
              <Link 
                key={category.id}
                to={`/templates/${category.id}`} 
                className="group"
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full">
                  <div className="relative">
                    <img 
                      src={category.image} 
                      alt={category.title} 
                      className="w-full h-64 object-cover group-hover:opacity-90 transition-opacity"
                    />
                    <div className="absolute top-4 right-4 bg-white text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                      {category.count} Şablon
                    </div>
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-3 group-hover:text-[#0077b6] transition-colors">
                      {category.title}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      {category.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-[#0077b6] font-medium group-hover:underline">
                        Şablonlara Göz At
                      </span>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 text-[#0077b6] transform group-hover:translate-x-1 transition-transform" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Start From Scratch Section */}
      <section className="py-16 bg-gray-50">
        <div className="w-full max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Aradığınızı Bulamıyor musunuz?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Sıfırdan başlayın ve vizyonunuza mükemmel şekilde uyan tamamen özel bir tasarım oluşturun.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              to="/editor/popup" 
              className="btn bg-[#0077b6] hover:bg-[#005f92] text-white px-6 py-3 rounded-lg font-medium"
            >
              Özel Popup Oluştur
            </Link>
            <Link 
              to="/editor/banner" 
              className="btn bg-[#d90cb2] hover:bg-[#b0099e] text-white px-6 py-3 rounded-lg font-medium"
            >
              Özel Banner Oluştur
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TemplatesPage; 
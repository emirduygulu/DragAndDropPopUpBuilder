import { Link } from 'react-router-dom';
import Layout from '../../components/UI/Layout';

const HomePage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-[#0077b6] text-white">
        <div className="w-full max-w-7xl mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Kodlama Olmadan Güzel Web Elementleri Oluşturun
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Sezgisel sürükle-bırak oluşturucumuzla profesyonel popup'lar ve bannerlar tasarlayın.
              Dönüşümleri ve etkileşimi dakikalar içinde artırın.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                to="/templates/popup" 
                className="btn bg-white text-[#0077b6] hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold shadow-lg transition-all"
              >
                Şablonlara Göz At
              </Link>
              <Link 
                to="/editor/popup" 
                className="btn border-2 border-white text-white hover:bg-white hover:text-[#0077b6] px-8 py-3 rounded-lg font-semibold transition-all"
              >
                Sıfırdan Başla
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="w-full max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Güçlü Web Elementleri Oluşturun</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto">
            {/* Popup Card */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300">
              <div className="h-64 bg-[#1e78b9] flex items-center justify-center p-6">
                <div className="bg-white w-4/5 h-4/5 rounded-lg flex flex-col items-center justify-center shadow-lg p-4">
                  <div className="w-12 h-1 bg-gray-200 rounded-full mb-4"></div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Bülten Kaydı</h3>
                  <div className="w-3/4 h-8 bg-gray-100 rounded mb-3"></div>
                  <div className="w-3/4 h-10 bg-[#1e78b9] rounded"></div>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-3">Popup Oluşturucu</h2>
                <p className="text-gray-600 mb-6">
                  E-posta toplama, promosyonlar, duyurular ve daha fazlası için ilgi çekici popup'lar oluşturun.
                  Markanıza uyacak şekilde her yönünü özelleştirin.
                </p>
                <Link 
                  to="/templates/popup" 
                  className="inline-block bg-[#1e78b9] hover:bg-[#005f92] text-white font-medium px-6 py-3 rounded-lg transition-colors w-full text-center"
                >
                  Popup Şablonlarına Göz At
                </Link>
              </div>
            </div>
            
            {/* Banner Card */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300">
              <div className="h-64 bg-[#ecc02f] flex items-center justify-center p-6">
                <div className="bg-white w-full h-1/3 rounded-lg flex items-center justify-between shadow-lg px-4">
                  <span className="text-lg font-semibold text-gray-800">Özel Teklif</span>
                  <div className="flex gap-2">
                    <div className="w-20 h-8 bg-[#ecc02f] rounded"></div>
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-3">Banner Oluşturucu</h2>
                <p className="text-gray-600 mb-6">
                  Web sitenizin başlığı, alt bilgisi veya herhangi bir bölümü için göz alıcı bannerlar tasarlayın.
                  Dikkat çekin ve harekete geçirin.
                </p>
                <Link 
                  to="/templates/banner" 
                  className="inline-block bg-[#ecc02f] hover:bg-[#b0099e] text-white font-medium px-6 py-3 rounded-lg transition-colors w-full text-center"
                >
                  Banner Şablonlarına Göz At
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="w-full max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Nasıl Çalışır</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Üç basit adımda güzel web elementleri oluşturun
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 text-[#0077b6] rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-3">Şablon Seçin</h3>
              <p className="text-gray-600">
                Profesyonel olarak tasarlanmış şablon kütüphanemize göz atın veya sıfırdan başlayın.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 text-[#0077b6] rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-3">Tasarımı Özelleştirin</h3>
              <p className="text-gray-600">
                Elementleri sürükleyip bırakın, renkleri, yazı tiplerini ve içeriği markanıza uyacak şekilde değiştirin.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 text-[#0077b6] rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-3">Yayınlayın ve Dönüştürün</h3>
              <p className="text-gray-600">
                Tasarımınızı dışa aktırın veya doğrudan web sitenize yerleştirmek için kodu alın.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="w-full max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Harika Web Elementleri Oluşturmaya Hazır mısınız?</h2>
          <p className="text-xl mb-8 opacity-80 max-w-2xl mx-auto">
            DragDropBuilder'ı kullanarak yüksek dönüşümlü web elementleri oluşturan binlerce pazarlamacı ve tasarımcıya katılın.
          </p>
          <Link 
            to="/templates" 
            className="inline-block bg-[#0077b6] hover:bg-[#005f92] text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors"
          >
            Şablonları Keşfedin
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage; 